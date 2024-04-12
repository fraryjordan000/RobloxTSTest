import { Maid } from "Maid";

// For managing a single toggle button
export function ToggleButtonController(cfg: {
	btn: TextButton;

	onColor: Color3;
	offColor: Color3;

	defaultState: boolean;

	stateChanged: (new_state: boolean) => void;

	maid: Maid;
}): {
	setState: (new_state: boolean) => void;
} {
	let state = cfg.defaultState;
	const updateButton = () => (cfg.btn.BackgroundColor3 = state ? cfg.onColor : cfg.offColor);
	cfg.maid.GiveTask(
		cfg.btn.MouseButton1Click.Connect(() => {
			state = !state;
			updateButton();
			cfg.stateChanged(state);
		}),
	);
	updateButton();
	cfg.stateChanged(state);
	return {
		setState: (new_state: boolean) => {
			state = new_state;
			updateButton();
			cfg.stateChanged(state);
		},
	};
}

// For managing several option buttons, where only one button can be toggled at a time
export function OptionController(cfg: {
	buttons: {
		btn: TextButton;
		id: string;
		onColor: Color3;
		offColor: Color3;
	}[];

	defaultStateId: string;

	stateChanged: (new_state_id: string) => void;

	maid: Maid;
}): {
	forceState: (new_state_id: string) => void;
} {
	let state = cfg.defaultStateId;
	const updateButtons = () => {
		cfg.buttons.forEach((b) => {
			if (b.id === state) {
				b.btn.BackgroundColor3 = b.onColor;
			} else {
				b.btn.BackgroundColor3 = b.offColor;
			}
		});
	};
	cfg.buttons.forEach((b) => {
		cfg.maid.GiveTask(
			b.btn.MouseButton1Click.Connect(() => {
				state = b.id;
				updateButtons();
				cfg.stateChanged(state);
			}),
		);
	});
	updateButtons();
	cfg.stateChanged(state);
	return {
		forceState: (new_state_id: string) => {
			state = new_state_id;
			updateButtons();
			cfg.stateChanged(state);
		},
	};
}
