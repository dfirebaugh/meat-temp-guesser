import { html, LitElement, TemplateResult, render } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import TemperatureService from "../../services/temperature"
import { Inject } from '../../services/di';

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

@customElement('temperature-grid')
export default class extends LitElement {
    @property()
    entries: Array<{ temperature: number; time: number }>;

    @Inject("TemperatureService")
    temperatureService: TemperatureService;

    firstUpdated = () => {
        this.temperatureService.registerListener(this.updateEntries)
    }

    updateEntries = (entries: Array<{ temperature: number; time: number }>): void => {
        this.entries = [...entries];
    }

    handleDelete(time: number): void {
        this.temperatureService.dequeue(time)
    }

    private deleteRenderer = (root: HTMLElement, _: HTMLElement, model) => {
        render(
            html`
            <vaadin-button @click=${() => this.handleDelete(model.item.time)}>delete</vaadin-button>
          `,
            root
        );
    };

    private timeRenderer = (root: HTMLElement, _: HTMLElement, model) => {
        const time: Date = new Date(model.item.time)
        render(html`
                <span>
                    ${padTo2Digits(time.getHours())}:${padTo2Digits(time.getMinutes())}:${padTo2Digits(time.getSeconds())} - ${time.getMonth()}/${time.getDay()}
                </span>`, root);
    };

    render(): TemplateResult {
        return html`
        <vaadin-grid
            id="temp-grid" 
            .items="${this.entries}" 
            theme="row-dividers" 
            column-reordering-allowed 
            all-rows-visible
        >
            <vaadin-grid-column path="temperature"></vaadin-grid-column>
            <vaadin-grid-column path="time" .renderer=${this.timeRenderer}></vaadin-grid-column>
            <vaadin-grid-column path="delete" .renderer=${this.deleteRenderer}></vaadin-grid-column>
        </vaadin-grid>
    `;
    }
}
