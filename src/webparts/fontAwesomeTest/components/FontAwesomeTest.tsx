import * as React from 'react';
import styles from './FontAwesomeTest.module.scss';
import type { IFontAwesomeTestProps } from './IFontAwesomeTestProps';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleCheck,
  faCircleInfo,
  faEnvelope,
  faHeart,
  faHouse,
  faServer,
  faShieldHalved,
  faStar
} from '@fortawesome/free-solid-svg-icons';

interface IIconProps {
  color: string;
  decorative: boolean;
  icon: IconDefinition;
  label: string;
  size: number;
}

const APPROVED_ICONS: Record<string, IconDefinition> = {
  circleCheck: faCircleCheck,
  circleInfo: faCircleInfo,
  envelope: faEnvelope,
  heart: faHeart,
  house: faHouse,
  server: faServer,
  shield: faShieldHalved,
  star: faStar
};

const BundledIcon = ({ color, decorative, icon, label, size }: IIconProps): React.ReactElement => {
  const [width, height, , , pathData] = icon.icon;
  const paths: string[] = typeof pathData === 'string' ? [pathData] : pathData;

  return (
    <svg
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      className={styles.icon}
      focusable="false"
      role={decorative ? undefined : 'img'}
      style={{ color, height: size, width: size }}
      viewBox={`0 0 ${width} ${height}`}
    >
      {paths.map((path, index) => <path d={path} key={index} />)}
    </svg>
  );
};

export default class FontAwesomeTest extends React.Component<IFontAwesomeTestProps> {
  public render(): React.ReactElement<IFontAwesomeTestProps> {
    const {
      accessibleLabel,
      iconColor,
      iconName,
      iconSize,
      linkUrl,
      openInNewTab,
      showLabel
    } = this.props;
    const selectedIconName: string = iconName || 'circleCheck';
    const selectedColor: string = iconColor || '#4052B5';
    const selectedSize: number = iconSize || 64;
    const label: string = (accessibleLabel || 'Approved').trim() || 'Approved';
    const candidateLinkUrl: string = (linkUrl || '').trim();
    const safeLinkUrl: string | undefined = /^https?:\/\//i.test(candidateLinkUrl)
      ? candidateLinkUrl
      : undefined;
    const icon: IconDefinition = APPROVED_ICONS[selectedIconName] || faCircleCheck;

    const content: React.ReactElement = (
      <span className={styles.iconContent}>
        <BundledIcon
          color={selectedColor}
          decorative={!!safeLinkUrl}
          icon={icon}
          label={label}
          size={selectedSize}
        />
        {showLabel !== false && <span className={styles.label}>{label}</span>}
      </span>
    );

    return (
      <section className={styles.fontAwesomeTest}>
        {safeLinkUrl
          ? (
            <a
              aria-label={label}
              className={styles.iconLink}
              href={safeLinkUrl}
              rel={openInNewTab ? 'noopener noreferrer' : undefined}
              target={openInNewTab ? '_blank' : undefined}
            >
              {content}
            </a>
          )
          : content}
      </section>
    );
  }
}
