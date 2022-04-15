import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import TemperatureService from "../../services/temperature"
import { Inject } from '../../services/di';

@customElement('temperature-guess')
export default class extends LitElement {
    @property()
    guess: number = 42;

    @Inject("TemperatureService")
    temperatureService: TemperatureService;

    firstUpdated(): void {
        this.temperatureService.registerListener(this.updateGuess);
    }

    updateGuess = (entries: Array<{ temperature: number; time: number }>): void => {
        if (entries.length == 0) {
            this.guess = 0;
            return;
        }
        const average = entries.map(e => e.temperature).reduce((a, b) => Number(a) + Number(b)) / entries.length

        this.guess = Math.trunc(average);
    }

    render() {
        return html`<h1>${this.guess}</h1>
    `;
    }
}
