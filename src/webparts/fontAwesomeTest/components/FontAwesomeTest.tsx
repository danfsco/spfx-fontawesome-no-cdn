import * as React from 'react';
import styles from './FontAwesomeTest.module.scss';
import type { IFontAwesomeTestProps } from './IFontAwesomeTestProps';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleCheck,
  faServer,
  faShieldHalved
} from '@fortawesome/free-solid-svg-icons';

interface IIconProps {
  icon: IconDefinition;
}

const BundledIcon = ({ icon }: IIconProps): React.ReactElement => {
  const [width, height, , , pathData] = icon.icon;
  const paths: string[] = typeof pathData === 'string' ? [pathData] : pathData;

  return (
    <svg
      aria-hidden="true"
      className={styles.icon}
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
    >
      {paths.map((path, index) => <path d={path} key={index} />)}
    </svg>
  );
};

export default class FontAwesomeTest extends React.Component<IFontAwesomeTestProps> {
  public render(): React.ReactElement<IFontAwesomeTestProps> {
    return (
      <section className={styles.fontAwesomeTest}>
        <h2>Bundled Font Awesome test</h2>
        <p className={styles.intro}>
          These SVG icons are imported from npm packages and included in the SPFx solution.
          The page does not load Font Awesome from a public CDN.
        </p>

        <div className={styles.iconGrid}>
          <div className={styles.iconCard}>
            <BundledIcon icon={faCircleCheck} />
            <strong>Package loaded</strong>
          </div>
          <div className={styles.iconCard}>
            <BundledIcon icon={faShieldHalved} />
            <strong>No public CDN</strong>
          </div>
          <div className={styles.iconCard}>
            <BundledIcon icon={faServer} />
            <strong>Hosted by SharePoint</strong>
          </div>
        </div>

        <p className={styles.environment}>{this.props.environmentMessage}</p>
      </section>
    );
  }
}
