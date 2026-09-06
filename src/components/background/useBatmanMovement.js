import { useEffect } from 'react';

const ASCENT_DELAY = [900, 1800];
const ROOFTOP_PAUSE = [1800, 3600];
const GROUND_PAUSE = [700, 1500];

const randomBetween = (minimum, maximum) => minimum + Math.random() * (maximum - minimum);
const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);
const translate = ({ x, y }) => `translate3d(${x}px, ${y}px, 0)`;

function getRoofPosition(building, sceneRect, batmanWidth, baselineBottom) {
  const rooftop = building.querySelector('[data-rooftop]');

  if (!rooftop) return null;

  const rooftopRect = rooftop.getBoundingClientRect();
  const landingPoint = 0.5;
  const roofX = rooftopRect.left - sceneRect.left + rooftopRect.width * landingPoint;
  const roofY = rooftopRect.top - sceneRect.top;

  return {
    id: building.dataset.buildingId,
    rooftop,
    landingPoint,
    x: roofX - batmanWidth / 2,
    y: roofY - baselineBottom,
    roofX,
    roofY,
  };
}

function chooseRooftop({ batman, current, scene, skyline, previousBuildingId }) {
  const sceneRect = scene.getBoundingClientRect();
  const batmanWidth = batman.offsetWidth;
  const batmanBottom = Number.parseFloat(window.getComputedStyle(batman).bottom);
  const baselineBottom = sceneRect.height - batmanBottom;
  const maximumX = Math.max(0, sceneRect.width - batmanWidth);
  const minimumDiagonalDistance = Math.min(80, Math.max(34, sceneRect.width * 0.055));
  const buildings = [...skyline.querySelectorAll('[data-building-id]')];

  const visibleRooftops = buildings
    .map((building) => getRoofPosition(building, sceneRect, batmanWidth, baselineBottom))
    .filter(Boolean)
    .filter((roof) => roof.roofX >= batmanWidth / 2 && roof.roofX <= sceneRect.width - batmanWidth / 2)
    .filter((roof) => roof.roofY >= 0 && roof.roofY < sceneRect.height)
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

export function useBatmanMovement({
  batmanRef,
  grappleLineRef,
  sceneRef,
  skylineRef,
  setMotion,
  setDirection,
  setDescent,
}) {
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
    let grappleFrame = null;
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

    const hideGrappleLine = () => {
      if (grappleFrame !== null) {
        window.cancelAnimationFrame(grappleFrame);
        grappleFrame = null;
      }
      grappleLine.style.opacity = '0';
    };

    const aimGrappleLine = (rooftop) => {
      const updateLine = () => {
        if (!isActive) return;

        const batmanRect = batman.getBoundingClientRect();
        const rooftopRect = rooftop.rooftop.getBoundingClientRect();
        const originX = batmanRect.left + batmanRect.width / 2;
        const originY = batmanRect.top + batmanRect.height * 0.28;
        const targetX = rooftopRect.left + rooftopRect.width * rooftop.landingPoint;
        const targetY = rooftopRect.top;
        const deltaX = targetX - originX;
        const deltaY = targetY - originY;
        const distance = Math.hypot(deltaX, deltaY);
        const angle = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);

        grappleLine.style.height = `${distance}px`;
        grappleLine.style.transform = `rotate(${angle}deg)`;
        grappleLine.style.opacity = '0.72';
        grappleFrame = window.requestAnimationFrame(updateLine);
      };

      updateLine();
    };

    const grappleTo = async (rooftop) => {
      const deltaX = rooftop.x - current.x;
      const deltaY = rooftop.y - current.y;
      const distance = Math.hypot(deltaX, deltaY);
      const duration = clamp(distance * 2.1, 850, 1800);

      aimGrappleLine(rooftop);
      const completed = await moveBatman(rooftop, {
        duration,
        easing: 'cubic-bezier(0.42, 0, 0.2, 1)',
      });

      hideGrappleLine();
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

        setDirection(rooftop.x < current.x ? 'left' : 'right');
        setMotion('grappling');
        if (!(await grappleTo(rooftop))) return;

        previousBuildingId = rooftop.id;
        setMotion('perched');
        if (!(await wait(randomBetween(...ROOFTOP_PAUSE)))) return;

        const destination = chooseDropPosition(current, scene.clientWidth, batman.offsetWidth);
        const dropDistance = Math.hypot(destination.x - current.x, destination.y - current.y);
        const horizontalDistance = destination.x - current.x;
        const descent = Math.abs(horizontalDistance) < 1 ? 'vertical' : 'diagonal';

        setDescent(descent);
        if (horizontalDistance < -1) setDirection('left');
        if (horizontalDistance > 1) setDirection('right');
        setMotion('dropping');
        if (
          !(await moveBatman(destination, {
            duration: clamp(dropDistance * 1.45, 500, 1050),
            easing: 'cubic-bezier(0.45, 0, 0.9, 0.55)',
          }))
        ) {
          return;
        }

        setMotion('grounded');
        setDescent(null);
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
      hideGrappleLine();
      animations.forEach((animation) => animation.cancel());
    };
  }, [batmanRef, grappleLineRef, sceneRef, setDescent, setDirection, setMotion, skylineRef]);
}
