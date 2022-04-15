import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormLayoutResponsiveStep } from '@vaadin/form-layout';

import TemperatureService from "../../services/temperature"
import { Inject } from '../../services/di';

@customElement('temperature-form')
export default class extends LitElement {
    input: number;
    @Inject("TemperatureService")
    temperatureService: TemperatureService;

    private responsiveSteps: FormLayoutResponsiveStep[] = [
        // Use one column by default
        { minWidth: 0, columns: 1 },
        // Use two columns, if layout's width exceeds 500px
        { minWidth: '500px', columns: 2 },
    ];

    isValid(temp: number): void {
        
    }

    handleSubmit(): void {
        this.temperatureService.enqueue(this.input)
    }

    render() {
        return html`
      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-text-field label="temperature" @change=${(e) => this.input = e.target.value} value=${this.input}>
            <span slot="suffix">Fahrenheit</span>
        </vaadin-text-field>
        <vaadin-button @click=${this.handleSubmit}>Submit</vaadin-button>
      </vaadin-form-layout>
    `;
    }
}
