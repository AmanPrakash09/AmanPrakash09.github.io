import { useEffect } from 'react';

const ASCENT_DELAY = [900, 1800];
const GRAPPLE_SHOT_DURATION = 450;
const ROOFTOP_PAUSE = [1800, 3600];
const GROUND_PAUSE = [700, 1500];
const JOKER_ENCOUNTER_CHANCE = 0.5;
const JOKER_DISTANT_SPAWN_CHANCE = 0.65;
const JOKER_SMOKE_DURATION = 1000;
const JOKER_REVEAL_DELAY = 300;
const JOKER_DAMAGE_FRAME_DURATION = 130;
const JOKER_HIT_DURATION = JOKER_DAMAGE_FRAME_DURATION * 3 * 2;
const JOKER_COLLAPSE_DURATION = JOKER_DAMAGE_FRAME_DURATION * 4;
const JOKER_FALL_DURATION = 600;

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
  jokerRef,
  sceneRef,
  skylineRef,
  setMotion,
  setDirection,
  setDescent,
  setJoker,
}) {
  useEffect(() => {
    const batman = batmanRef.current;
    const grappleLine = grappleLineRef.current;
    const joker = jokerRef.current;
    const scene = sceneRef.current;
    const skyline = skylineRef.current;

    if (!batman || !grappleLine || !joker || !scene || !skyline) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timers = new Map();
    const animations = new Set();
    let isActive = true;
    let grappleFrame = null;
    let previousBuildingId = null;
    let currentDirection = 'right';
    let current = {
      x: clamp(scene.clientWidth * 0.07, 18, Math.min(110, scene.clientWidth - batman.offsetWidth)),
      y: 0,
    };

    const placeBatman = (position) => {
      batman.style.transform = translate(position);
    };

    const face = (direction) => {
      currentDirection = direction;
      setDirection(direction);
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

    const aimGrappleLine = (rooftop, grapple) => {
      const shotStartedAt = window.performance.now();

      const updateLine = (timestamp = window.performance.now()) => {
        if (!isActive) return;

        const batmanRect = batman.getBoundingClientRect();
        const rooftopRect = rooftop.rooftop.getBoundingClientRect();
        const anchorDirection = grapple.direction === 'left' ? -1 : 1;
        const horizontalAnchor = 0.5 + anchorDirection * (grapple.isMoving ? 0.55 : 0.58);
        const verticalAnchor = grapple.isMoving ? 0.32 : 0.05;
        const originX = batmanRect.left + batmanRect.width * horizontalAnchor;
        const originY = batmanRect.top + batmanRect.height * verticalAnchor;
        const targetX = rooftopRect.left + rooftopRect.width * rooftop.landingPoint;
        const targetY = rooftopRect.top;
        const deltaX = targetX - originX;
        const deltaY = targetY - originY;
        const distance = Math.hypot(deltaX, deltaY);
        const angle = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);
        const extension = grapple.isMoving ? 1 : clamp((timestamp - shotStartedAt) / GRAPPLE_SHOT_DURATION, 0, 1);

        grappleLine.style.left = `${horizontalAnchor * 100}%`;
        grappleLine.style.bottom = `${(1 - verticalAnchor) * 100}%`;
        grappleLine.style.height = `${distance * extension}px`;
        grappleLine.style.transform = `rotate(${angle}deg)`;
        grappleLine.style.opacity = '0.72';
        grappleFrame = window.requestAnimationFrame(updateLine);
      };

      updateLine();
    };

    const grappleTo = async (rooftop, direction) => {
      const deltaX = rooftop.x - current.x;
      const deltaY = rooftop.y - current.y;
      const distance = Math.hypot(deltaX, deltaY);
      const duration = clamp(distance * 2.1, 850, 1800);
      const grapple = { direction, isMoving: false };

      aimGrappleLine(rooftop, grapple);
      if (!(await wait(GRAPPLE_SHOT_DURATION))) {
        hideGrappleLine();
        return false;
      }

      grapple.isMoving = true;
      setMotion('grappling');
      const completed = await moveBatman(rooftop, {
        duration,
        easing: 'cubic-bezier(0.42, 0, 0.2, 1)',
      });

      hideGrappleLine();
      return completed;
    };

    const dropBatman = async (destination) => {
      const dropDistance = Math.hypot(destination.x - current.x, destination.y - current.y);
      const horizontalDistance = destination.x - current.x;
      const descent = Math.abs(horizontalDistance) < 1 ? 'vertical' : 'diagonal';

      setDescent(descent);
      if (horizontalDistance < -1) face('left');
      if (horizontalDistance > 1) face('right');
      setMotion('dropping');

      const completed = await moveBatman(destination, {
        duration: clamp(dropDistance * 1.45, 500, 1800),
        easing: 'cubic-bezier(0.45, 0, 0.9, 0.55)',
      });

      if (!completed) return false;

      setMotion('grounded');
      setDescent(null);
      return true;
    };

    const chooseNearbyJokerEncounter = (gap) => {
      const batmanWidth = batman.offsetWidth;
      const jokerWidth = joker.offsetWidth;
      const maximumJokerX = Math.max(0, scene.clientWidth - jokerWidth);
      const maximumBatmanX = Math.max(0, scene.clientWidth - batmanWidth);
      const positionJoker = (direction) =>
        direction === 'right' ? current.x + batmanWidth + gap : current.x - jokerWidth - gap;
      let batmanDirection = currentDirection;
      let jokerX = positionJoker(batmanDirection);

      if (jokerX < 0 || jokerX > maximumJokerX) {
        batmanDirection = batmanDirection === 'right' ? 'left' : 'right';
        jokerX = positionJoker(batmanDirection);
      }

      return {
        batmanDirection,
        batmanDestination: { x: clamp(current.x, 0, maximumBatmanX), y: 0 },
        jokerDirection: batmanDirection === 'right' ? 'left' : 'right',
        jokerX: clamp(jokerX, 0, maximumJokerX),
      };
    };

    const chooseDistantJokerEncounter = (gap) => {
      const batmanWidth = batman.offsetWidth;
      const jokerWidth = joker.offsetWidth;
      const maximumJokerX = Math.max(0, scene.clientWidth - jokerWidth);
      const maximumBatmanX = Math.max(0, scene.clientWidth - batmanWidth);
      const minimumGlide = clamp(scene.clientWidth * 0.18, 80, 240);
      const leftMaximum = current.x - minimumGlide - jokerWidth - gap;
      const rightMinimum = current.x + minimumGlide + batmanWidth + gap;
      const availableDirections = [];

      if (leftMaximum >= 0) availableDirections.push('left');
      if (rightMinimum <= maximumJokerX) availableDirections.push('right');
      if (availableDirections.length === 0) return null;

      const batmanDirection =
        availableDirections[Math.floor(Math.random() * availableDirections.length)];
      const jokerX =
        batmanDirection === 'left'
          ? randomBetween(0, leftMaximum)
          : randomBetween(rightMinimum, maximumJokerX);
      const batmanX =
        batmanDirection === 'left'
          ? jokerX + jokerWidth + gap
          : jokerX - batmanWidth - gap;

      return {
        batmanDirection,
        batmanDestination: { x: clamp(batmanX, 0, maximumBatmanX), y: 0 },
        jokerDirection: batmanDirection === 'right' ? 'left' : 'right',
        jokerX,
      };
    };

    const spawnJoker = () => {
      const gap = randomBetween(6, 10);
      const distantEncounter =
        Math.random() < JOKER_DISTANT_SPAWN_CHANCE ? chooseDistantJokerEncounter(gap) : null;
      const encounter = distantEncounter ?? chooseNearbyJokerEncounter(gap);

      face(encounter.batmanDirection);
      joker.style.transform = translate({ x: encounter.jokerX, y: 0 });
      setJoker({
        visible: false,
        smokeVisible: true,
        direction: encounter.jokerDirection,
        damage: null,
      });
      return encounter;
    };

    const runJokerEncounter = async () => {
      const encounter = spawnJoker();
      if (!(await wait(JOKER_REVEAL_DELAY))) return false;

      setJoker((currentJoker) => ({ ...currentJoker, visible: true }));
      if (!(await wait(JOKER_SMOKE_DURATION - JOKER_REVEAL_DELAY))) return false;

      setJoker((currentJoker) => ({ ...currentJoker, smokeVisible: false }));
      if (!(await dropBatman(encounter.batmanDestination))) return false;

      setMotion('melee-attacking');
      setJoker((currentJoker) => ({ ...currentJoker, damage: 'hit' }));
      if (!(await wait(JOKER_HIT_DURATION))) return false;

      setJoker((currentJoker) => ({ ...currentJoker, damage: 'collapse' }));
      if (!(await wait(JOKER_COLLAPSE_DURATION))) return false;

      const knockbackDirection = encounter.jokerDirection === 'left' ? 1 : -1;
      const knockbackDistance = clamp(scene.clientWidth * 0.025, 18, 34);
      const knockbackDestination = {
        x: encounter.jokerX + knockbackDistance * knockbackDirection,
        y: 0,
      };
      const knockback = joker.animate(
        [
          { transform: translate({ x: encounter.jokerX, y: 0 }) },
          { transform: translate(knockbackDestination) },
        ],
        {
          duration: JOKER_FALL_DURATION,
          easing: 'cubic-bezier(0.2, 0.7, 0.35, 1)',
          fill: 'forwards',
        },
      );

      animations.add(knockback);
      setJoker((currentJoker) => ({ ...currentJoker, damage: 'falling' }));
      void knockback.finished.then(
        () => {
          animations.delete(knockback);
          if (!isActive) return;

          joker.style.transform = translate(knockbackDestination);
          knockback.cancel();
          setJoker({
            visible: false,
            smokeVisible: false,
            direction: encounter.jokerDirection,
            damage: null,
          });
        },
        () => {
          animations.delete(knockback);
        },
      );

      setMotion('grounded');
      return true;
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

        const grappleDirection = rooftop.x < current.x ? 'left' : 'right';
        face(grappleDirection);
        setMotion('grapple-shooting');
        if (!(await grappleTo(rooftop, grappleDirection))) return;

        previousBuildingId = rooftop.id;
        setMotion('perched');
        if (!(await wait(randomBetween(...ROOFTOP_PAUSE)))) return;

        if (Math.random() < JOKER_ENCOUNTER_CHANCE) {
          if (!(await runJokerEncounter())) return;
        } else {
          const destination = chooseDropPosition(current, scene.clientWidth, batman.offsetWidth);
          if (!(await dropBatman(destination))) return;
          if (!(await wait(randomBetween(...GROUND_PAUSE)))) return;
        }
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
      setJoker({ visible: false, smokeVisible: false, direction: 'left', damage: null });
      hideGrappleLine();
      animations.forEach((animation) => animation.cancel());
    };
  }, [
    batmanRef,
    grappleLineRef,
    jokerRef,
    sceneRef,
    setDescent,
    setDirection,
    setJoker,
    setMotion,
    skylineRef,
  ]);
}
