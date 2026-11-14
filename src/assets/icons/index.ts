import type { FC, SVGProps } from 'react';

import ArrowRight from './arrow-right.svg';
import Clock from './clock.svg';
import DecoChat from './deco-chat.svg';
import DecoCube from './deco-cube.svg';
import DecoDrop from './deco-drop.svg';
import DecoLetterB from './deco-letter-b.svg';
import DecoPanels from './deco-panels.svg';
import Logo from './logo.svg';
import Menu from './menu.svg';
import Message from './message.svg';
import Quote from './quote.svg';
import Star from './star.svg';

// Next types `*.svg` imports as `any`; typing the exports restores checking.
type SvgIcon = FC<SVGProps<SVGSVGElement> & { title?: string }>;

export const ArrowRightIcon: SvgIcon = ArrowRight;
export const ClockIcon: SvgIcon = Clock;
export const DecoChatIcon: SvgIcon = DecoChat;
export const DecoCubeIcon: SvgIcon = DecoCube;
export const DecoDropIcon: SvgIcon = DecoDrop;
export const DecoLetterBIcon: SvgIcon = DecoLetterB;
export const DecoPanelsIcon: SvgIcon = DecoPanels;
export const LogoIcon: SvgIcon = Logo;
export const MenuIcon: SvgIcon = Menu;
export const MessageIcon: SvgIcon = Message;
export const QuoteIcon: SvgIcon = Quote;
export const StarIcon: SvgIcon = Star;
