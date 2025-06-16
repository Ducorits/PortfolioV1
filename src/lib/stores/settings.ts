// src/lib/stores/settings.ts
import type { Color } from "pixi.js";
import { writable } from "svelte/store";

export interface FlowSettings {
  backgroundColor: string;
  clearBackground: boolean;
  cellSize: number;
  curve: number;
  zoom: number;
  particleCount: number;
  fadeAlpha: number;
  showDebug: boolean;
  particleColors: string[];
  particleSize: number;
}

export const settings = writable<FlowSettings>({
  cellSize: 10,
  curve: 1,
  zoom: 0.05,
  particleCount: 1000,
  fadeAlpha: 0.01,
  showDebug: false,
  particleColors: ["#1155aa", "#4455bb", "#4499ee"],
  backgroundColor: "#111122",
  clearBackground: false,
  particleSize: 1,
});
