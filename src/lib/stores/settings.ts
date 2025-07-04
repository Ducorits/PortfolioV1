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
  enableMouseDrag: boolean;
  particleSpeed: number;
  trailLength: number;
}

export const settings = writable<FlowSettings>({
  cellSize: 10,
  curve: 1,
  zoom: 0.05,
  particleCount: 1000,
  fadeAlpha: 0.02,
  showDebug: false,
  particleColors: ["#1155aa", "#4455bb", "#4499ee"],
  backgroundColor: "#111122",
  clearBackground: false,
  particleSize: 1,
  enableMouseDrag: false,
  particleSpeed: 0.5,
  trailLength: 0,
});
