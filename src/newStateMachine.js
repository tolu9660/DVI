let idCount = 0;
export default class StateMachine {
    constructor(context, id) {
        this.id = (++idCount).toString();
        this.states = new Map();
        this.isChangingState = false;
        this.changeStateQueue = [];
        this.id = id !== null && id !== void 0 ? id : this.id;
        this.context = context;
    }
    get previousStateName() {
        if (!this.previousState) {
            return '';
        }
        return this.previousState.name;
    }
    isCurrentState(name) {
        if (!this.currentState) {
            return false;
        }
        return this.currentState.name === name;
    }
    addState(name, config) {
        var _a, _b, _c;
        const context = this.context;
        this.states.set(name, {
            name,
            onEnter: (_a = config === null || config === void 0 ? void 0 : config.onEnter) === null || _a === void 0 ? void 0 : _a.bind(context),
            onUpdate: (_b = config === null || config === void 0 ? void 0 : config.onUpdate) === null || _b === void 0 ? void 0 : _b.bind(context),
            onExit: (_c = config === null || config === void 0 ? void 0 : config.onExit) === null || _c === void 0 ? void 0 : _c.bind(context)
        });
        return this;
    }
    setState(name) {
        var _a, _b;
        if (!this.states.has(name)) {
            console.warn(`Tried to change to unknown state: ${name}`);
            return;
        }
        if (this.isCurrentState(name)) {
            return;
        }
        if (this.isChangingState) {
            this.changeStateQueue.push(name);
            return;
        }
        this.isChangingState = true;
        console.log(`[StateMachine (${this.id})] change from ${(_b = (_a = this.currentState) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'none'} to ${name}`);
        if (this.currentState && this.currentState.onExit) {
            this.currentState.onExit();
        }
        this.previousState = this.currentState;
        this.currentState = this.states.get(name);
        if (this.currentState.onEnter) {
            this.currentState.onEnter();
        }
        this.isChangingState = false;
    }
    update(dt) {
        if (this.changeStateQueue.length > 0) {
            this.setState(this.changeStateQueue.shift());
            return;
        }
        if (this.currentState && this.currentState.onUpdate) {
            this.currentState.onUpdate(dt);
        }
    }
}