import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/rpg-character/rpg-character.js";

/**
 * `project-2`
 * 
 * @demo index.html
 * @element project-2
 */
export class Project2 extends DDDSuper(LitElement) {
  static get tag() {
    return "project-2";
  }

  constructor() {
    super();
    this.title = "Customize Your RPG Character";
    this.characterConfig = {
      accessory: "none",
      base: "human",
      face: "happy",
      hair: "short",
      skin: "light",
      fire: false,
      walk: false,
      circle: false,
      imageSrc: "images/human.png", // Default image
    };
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      characterConfig: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          padding: 16px;
          font-family: Arial, sans-serif;
        }

        .controls {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        label {
          font-size: 14px;
          font-weight: bold;
          color: #ffffff;
        }

        select,
        button {
          padding: 10px;
          font-size: 14px;
          border-radius: 5px;
          border: none;
          outline: none;
          background-color: #003366; /* Dark Blue */
          color: #ffffff;
          transition: all 0.3s ease;
        }

        button:hover,
        select:hover {
          background-color: #0055cc; /* Lighter Blue */
          box-shadow: 0 0 10px #00f, 0 0 20px #00f;
          transform: scale(1.05);
        }

        .character-image {
          margin-top: 20px;
          text-align: center;
        }

        .character-image img {
          max-width: 200px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(255, 255, 255, 0.5);
        }
      `,
    ];
  }

  updateCharacterConfig(key, value) {
    // Update the character config
    this.characterConfig = { ...this.characterConfig, [key]: value };

    // Handle custom logic for the base property to update the image
    if (key === "base") {
      const imageMap = {
        human: "images/human.png",
        elf: "images/elf.png",
        dwarf: "images/dwarf.png",
      };
      this.characterConfig.imageSrc = imageMap[value] || "images/human.png";
    }

    // Trigger Lit's rendering mechanism
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="controls">
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

      <!-- Display the selected character image -->
      <div class="character-image">
        <img src="${this.characterConfig.imageSrc}" alt="${this.characterConfig.base} character" />
      </div>

      <!-- Render the rpg-character element -->
      <rpg-character
        .accessory=${this.characterConfig.accessory}
        .base=${this.characterConfig.base}
        .face=${this.characterConfig.face}
        .hair=${this.characterConfig.hair}
        .skin=${this.characterConfig.skin}
        ?fire=${this.characterConfig.fire}
        ?walk=${this.characterConfig.walk}
        ?circle=${this.characterConfig.circle}
      ></rpg-character>
    `;
  }
}

customElements.define(Project2.tag, Project2);
