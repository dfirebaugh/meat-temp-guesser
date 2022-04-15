// lit element
import { customElement } from 'lit/decorators.js';
import { html, LitElement, TemplateResult } from 'lit';

// meat-temp
import './vaadin-loader';
import './components/temperature-form';
import './components/theme-toggler';
import './components/temperature-grid';
import './components/temperature-guess';

@customElement('meat-temp-app')
export class MeatTemp extends LitElement {
  render(): TemplateResult {
    return html`
    <theme-toggler></theme-toggler>
    <temperature-guess></temperature-guess>
    <temperature-form></temperature-form>
    <temperature-grid></temperature-grid>
    `;
  }
}
