import * as pg from "/src/planetgame.ts";
import { Tween, Easing, update } from "@tweenjs/tween.js";
import { EventEmitter } from "/src/util/event_emitter.ts";
import _3D from "./src/util/_3D.js";

let emit = new EventEmitter();

pg.initPlanetGame();
