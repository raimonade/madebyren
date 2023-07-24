import { useRef, useEffect } from 'react';
import { m, useSpring, useTransform } from 'framer-motion';
import normalizeWheel from 'normalize-wheel';
import { useRafLoop } from 'react-use';
import { useWindowSize } from '@react-hook/window-size';

const _ = {
	content: 'UNDER CONSTRUCTION CONTENT PENDING',
	speed: 2,
	threshold: 0.014,
	wheelFactor: 1.8,
};

const MarqueeItem = ({ content, speed }) => {
	const item = useRef(null);
	const rect = useRef({});
	const x = useRef(0);

	const [width, height] = useWindowSize();

	const setX = () => {
		if (!item.current || !rect.current) return;
		const xPercentage = (x.current / rect.current.width) * 100;
		if (xPercentage < -100) x.current = 0;
		if (xPercentage > 0) x.current = -rect.current.width;
		item.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
	};

	useEffect(() => {
		rect.current = item.current.getBoundingClientRect();
	}, [width, height]);

	const loop = (e) => {
		x.current -= speed.get();
		setX();
	};

	useRafLoop(loop, true);

	return (
		<div className="item text-neutral-950 lg:text-[7vw] text-[12vw] font-bold" ref={item}>
			{content}
		</div>
	);
};

export const InteractiveMarquee = () => {
	const marquee = useRef(null);
	const slowDown = useRef(false);
	const isScrolling = useRef(false);

	const x = useRef(0);
	const speed = useSpring(_.speed, {
		damping: 40,
		stiffness: 90,
		mass: 5,
	});
	// const opacity = useTransform(speed, [-w * 0.25, 0, w * 0.25], [1, 0, 1]);

	const onWheel = (e) => {
		const normalized = normalizeWheel(e);
		x.current = normalized.pixelY * _.wheelFactor;

		// Reset speed on scroll end
		window?.clearTimeout(isScrolling.current);
		isScrolling.current = setTimeout(function () {
			speed.set(_.speed);
		}, 30);
	};

	const loop = () => {
		if (slowDown.current || Math.abs(x.current) < _.threshold) return;
		x.current *= 0.66;
		if (x.current < 0) {
			x.current = Math.min(x.current, 0);
		} else {
			x.current = Math.max(x.current, 0);
		}
		speed.set(_.speed + x.current);
	};

	useRafLoop(loop, true);

	return (
		<div className="absolute top-0 left-0 w-100 h-100">
			<m.div className="marquee" ref={marquee} onWheel={onWheel} drag="x">
				<MarqueeItem content={_.content} speed={speed} />
				<MarqueeItem content={_.content} speed={speed} />
				<MarqueeItem content={_.content} speed={speed} />
			</m.div>
		</div>
	);
};
