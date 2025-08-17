/**
 * Barrel file for SnapCube commands
 * --------------------------------
 * This file re-exports all the main CLI actions for easier imports.
 * Instead of importing each function individually from its file,
 * consumers can simply import them from "commands".
 *
 * Example:
 *   import { cloneProject, createProject, cloneGithubRepo } from "../commands";
 */

export * from "./cloneProject"; // Local project → JSON snapshot
export * from "./createProject"; // JSON snapshot → Restore project
export * from "./cloneGithubRepo"; // Remote GitHub repo → JSON snapshot
