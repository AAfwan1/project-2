import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/rpg-character/rpg-character.js";

export class Project2 extends DDDSuper(LitElement) {
  static get tag() {
    return "project-2";
  }

  constructor() {
    super();
    this.characterConfig = {
      gender: "male",
      base: "human",
      face: "happy",
      hair: "short",
      skin: "light",
      fire: false,
      walk: false,
      circle: false,
    };
  }

  static get properties() {
    return {
      characterConfig: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: 'UnifrakturMaguntia', serif;
      }

      .controls {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      label {
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        font-family: 'Cinzel', serif;
      }

      select,
      button {
        padding: 10px;
        font-size: 16px;
        font-family: 'Cinzel', serif;
        border-radius: 5px;
        border: none;
        background-color: #1e5128;
        color: #ffffff;
        transition: all 0.3s ease;
      }

      select {
        width: 50%;
        text-align: center;
      }

      select:hover,
      button:hover {
        background-color: #4a9f4e;
        box-shadow: 0 0 10px #4a9f4e;
        transform: scale(1.05);
      }
    `;
  }

  updateCharacterConfig(key, value) {
    this.characterConfig = { ...this.characterConfig, [key]: value };

    // Update the rpg-character element
    const character = document.getElementById("character-preview");
    if (character) {
      character[key] = value;
    }

    this.requestUpdate();
  }

  render() {
    return html`
      <div class="controls">
        <label for="gender-select">Gender:</label>
        <select id="gender-select" @change="${(e) => this.updateCharacterConfig('gender', e.target.value)}">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label for="base-select">Base:</label>
        <select id="base-select" @change="${(e) => this.updateCharacterConfig('base', e.target.value)}">
          <option value="human">Human</option>
          <option value="elf">Elf</option>
          <option value="dwarf">Dwarf</option>
        </select>

        <label for="face-select">Face:</label>
        <select id="face-select" @change="${(e) => this.updateCharacterConfig('face', e.target.value)}">
          <option value="happy">Happy</option>
          <option value="angry">Angry</option>
          <option value="neutral">Neutral</option>
        </select>

        <label for="hair-select">Hair:</label>
        <select id="hair-select" @change="${(e) => this.updateCharacterConfig('hair', e.target.value)}">
          <option value="short">Short</option>
          <option value="long">Long</option>
          <option value="bald">Bald</option>
        </select>

        <label for="skin-select">Skin Tone:</label>
        <select id="skin-select" @change="${(e) => this.updateCharacterConfig('skin', e.target.value)}">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="tan">Tan</option>
        </select>

        <button @click="${() => this.updateCharacterConfig('fire', !this.characterConfig.fire)}">
          Toggle Fire Effect
        </button>
        <button @click="${() => this.updateCharacterConfig('walk', !this.characterConfig.walk)}">
          Toggle Walking Animation
        </button>
        <button @click="${() => this.updateCharacterConfig('circle', !this.characterConfig.circle)}">
          Toggle Circular Background
        </button>
      </div>
    `;
  }
}

customElements.define(Project2.tag, Project2);
