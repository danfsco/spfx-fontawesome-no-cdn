import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'FontAwesomeTestWebPartStrings';
import FontAwesomeTest from './components/FontAwesomeTest';
import { IFontAwesomeTestProps } from './components/IFontAwesomeTestProps';

export interface IFontAwesomeTestWebPartProps {
  accessibleLabel: string;
  iconColor: string;
  iconName: string;
  iconSize: number;
  linkUrl: string;
  openInNewTab: boolean;
  showLabel: boolean;
}

export default class FontAwesomeTestWebPart extends BaseClientSideWebPart<IFontAwesomeTestWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFontAwesomeTestProps> = React.createElement(
      FontAwesomeTest,
      {
        accessibleLabel: this.properties.accessibleLabel,
        iconColor: this.properties.iconColor,
        iconName: this.properties.iconName,
        iconSize: this.properties.iconSize,
        linkUrl: this.properties.linkUrl,
        openInNewTab: this.properties.openInNewTab,
        showLabel: this.properties.showLabel
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('iconName', {
                  label: strings.IconFieldLabel,
                  options: [
                    { key: 'circleCheck', text: strings.CircleCheckIcon },
                    { key: 'circleInfo', text: strings.CircleInfoIcon },
                    { key: 'envelope', text: strings.EnvelopeIcon },
                    { key: 'heart', text: strings.HeartIcon },
                    { key: 'house', text: strings.HouseIcon },
                    { key: 'server', text: strings.ServerIcon },
                    { key: 'shield', text: strings.ShieldIcon },
                    { key: 'star', text: strings.StarIcon }
                  ]
                }),
                PropertyPaneSlider('iconSize', {
                  label: strings.SizeFieldLabel,
                  min: 24,
                  max: 160,
                  step: 8,
                  showValue: true
                }),
                PropertyPaneTextField('iconColor', {
                  label: strings.ColorFieldLabel,
                  onGetErrorMessage: this._validateColor
                }),
                PropertyPaneTextField('accessibleLabel', {
                  label: strings.AccessibleLabelFieldLabel
                }),
                PropertyPaneToggle('showLabel', {
                  label: strings.ShowLabelFieldLabel
                }),
                PropertyPaneTextField('linkUrl', {
                  description: strings.LinkFieldDescription,
                  label: strings.LinkFieldLabel,
                  onGetErrorMessage: this._validateLink
                }),
                PropertyPaneToggle('openInNewTab', {
                  disabled: !this.properties.linkUrl,
                  label: strings.OpenInNewTabFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _validateColor(value: string): string {
    return /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)
      ? ''
      : strings.ColorValidationMessage;
  }

  private _validateLink(value: string): string {
    if (!value) {
      return '';
    }

    try {
      const url: URL = new URL(value);
      return url.protocol === 'https:' || url.protocol === 'http:'
        ? ''
        : strings.LinkValidationMessage;
    } catch {
      return strings.LinkValidationMessage;
    }
  }
}
