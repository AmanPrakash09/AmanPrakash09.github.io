import { useEffect } from 'react';

const ASCENT_DELAY = [900, 1800];
const ROOFTOP_PAUSE = [1800, 3600];
const GROUND_PAUSE = [700, 1500];

const randomBetween = (minimum, maximum) => minimum + Math.random() * (maximum - minimum);
const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);
const translate = ({ x, y }) => `translate3d(${x}px, ${y}px, 0)`;

function getRoofPosition(building, sceneRect, batmanWidth) {
  const buildingRect = building.getBoundingClientRect();
  const roof = building.dataset.roof;
  const landingPoint = roof === 'sloped' ? 0.72 : roof === 'spire' || roof === 'antenna' ? 0.28 : 0.5;

  return {
    id: building.dataset.buildingId,
    x: buildingRect.left - sceneRect.left + buildingRect.width * landingPoint - batmanWidth / 2,
    y: buildingRect.top - buildingRect.bottom,
    roofX: buildingRect.left - sceneRect.left + buildingRect.width * landingPoint,
    roofTop: buildingRect.top,
  };
}

function chooseRooftop({ batman, current, scene, skyline, previousBuildingId }) {
  const sceneRect = scene.getBoundingClientRect();
  const batmanWidth = batman.offsetWidth;
  const maximumX = Math.max(0, sceneRect.width - batmanWidth);
  const minimumDiagonalDistance = Math.min(80, Math.max(34, sceneRect.width * 0.055));
  const buildings = [...skyline.querySelectorAll('[data-building-id]')];

  const visibleRooftops = buildings
    .map((building) => getRoofPosition(building, sceneRect, batmanWidth))
    .filter((roof) => roof.roofX >= batmanWidth / 2 && roof.roofX <= sceneRect.width - batmanWidth / 2)
    .filter((roof) => roof.roofTop >= sceneRect.top && roof.roofTop < sceneRect.bottom)
    .map((roof) => ({ ...roof, x: clamp(roof.x, 0, maximumX) }));

  const diagonalRooftops = visibleRooftops.filter(
    (roof) => roof.id !== previousBuildingId && Math.abs(roof.x - current.x) >= minimumDiagonalDistance,
  );
  const choices = diagonalRooftops.length > 0 ? diagonalRooftops : visibleRooftops;

  return choices[Math.floor(Math.random() * choices.length)];
}

function chooseDropPosition(current, sceneWidth, batmanWidth) {
  const maximumX = Math.max(0, sceneWidth - batmanWidth);

  if (Math.random() < 0.5) {
    return { x: current.x, y: 0 };
  }

  const minimumShift = Math.max(52, sceneWidth * 0.07);
  const maximumShift = Math.max(minimumShift, sceneWidth * 0.2);
  const canMoveLeft = current.x >= minimumShift;
  const canMoveRight = maximumX - current.x >= minimumShift;

  if (!canMoveLeft && !canMoveRight) {
    return { x: current.x, y: 0 };
  }

  const direction = canMoveLeft && canMoveRight ? (Math.random() < 0.5 ? -1 : 1) : canMoveLeft ? -1 : 1;
  const shift = randomBetween(minimumShift, maximumShift);

  return { x: clamp(current.x + shift * direction, 0, maximumX), y: 0 };
}

export function useBatmanMovement({ batmanRef, grappleLineRef, sceneRef, skylineRef }) {
  useEffect(() => {
    const batman = batmanRef.current;
    const grappleLine = grappleLineRef.current;
    const scene = sceneRef.current;
    const skyline = skylineRef.current;

    if (!batman || !grappleLine || !scene || !skyline) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timers = new Map();
    const animations = new Set();
    let isActive = true;
    let previousBuildingId = null;
    let current = {
      x: clamp(scene.clientWidth * 0.07, 18, Math.min(110, scene.clientWidth - batman.offsetWidth)),
      y: 0,
    };

    const placeBatman = (position) => {
      batman.style.transform = translate(position);
    };

    const wait = (duration) =>
      new Promise((resolve) => {
        const timer = window.setTimeout(() => {
          timers.delete(timer);
          resolve(isActive);
        }, duration);
        timers.set(timer, resolve);
      });

    const moveBatman = async (destination, options) => {
      const animation = batman.animate(
        [{ transform: translate(current) }, { transform: translate(destination) }],
        { duration: options.duration, easing: options.easing, fill: 'forwards' },
      );
      animations.add(animation);

      let completed = true;
      try {
        await animation.finished;
      } catch {
        completed = false;
      }

      animations.delete(animation);
      if (!completed || !isActive) return false;

      current = destination;
      placeBatman(current);
      animation.cancel();
      return true;
    };

    const grappleTo = async (rooftop) => {
      const deltaX = rooftop.x - current.x;
      const deltaY = rooftop.y - current.y;
      const distance = Math.hypot(deltaX, deltaY);
      const angle = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);
      const duration = clamp(distance * 2.1, 850, 1800);

      grappleLine.style.height = `${distance}px`;
      const lineAnimation = grappleLine.animate(
        [
          { opacity: 0.72, transform: `rotate(${angle}deg) scaleY(1)` },
          { opacity: 0.35, transform: `rotate(${angle}deg) scaleY(0.04)` },
        ],
        { duration, easing: 'cubic-bezier(0.42, 0, 0.2, 1)', fill: 'forwards' },
      );
      animations.add(lineAnimation);

      const completed = await moveBatman(rooftop, {
        duration,
        easing: 'cubic-bezier(0.42, 0, 0.2, 1)',
      });

      lineAnimation.cancel();
      animations.delete(lineAnimation);
      return completed;
    };

    const runPatrol = async () => {
      placeBatman(current);

      if (reducedMotion.matches || !(await wait(randomBetween(...ASCENT_DELAY)))) return;

      while (isActive) {
        const rooftop = chooseRooftop({ batman, current, scene, skyline, previousBuildingId });

        if (!rooftop) {
          if (!(await wait(1000))) return;
          continue;
        }

        batman.dataset.motion = 'grappling';
        if (!(await grappleTo(rooftop))) return;

        previousBuildingId = rooftop.id;
        batman.dataset.motion = 'perched';
        if (!(await wait(randomBetween(...ROOFTOP_PAUSE)))) return;

        const destination = chooseDropPosition(current, scene.clientWidth, batman.offsetWidth);
        const dropDistance = Math.hypot(destination.x - current.x, destination.y - current.y);
        batman.dataset.motion = 'dropping';
        if (
          !(await moveBatman(destination, {
            duration: clamp(dropDistance * 1.45, 500, 1050),
            easing: 'cubic-bezier(0.45, 0, 0.9, 0.55)',
          }))
        ) {
          return;
        }

        batman.dataset.motion = 'grounded';
        if (!(await wait(randomBetween(...GROUND_PAUSE)))) return;
      }
    };

    runPatrol();

    return () => {
      isActive = false;
      timers.forEach((resolve, timer) => {
        window.clearTimeout(timer);
        resolve(false);
      });
      timers.clear();
      animations.forEach((animation) => animation.cancel());
    };
  }, [batmanRef, grappleLineRef, sceneRef, skylineRef]);
}
