export type PROP_TYPE =
	| "boolean"
	| "number"
	| "string"
	| "Instance"
	| "BrickColor"
	| "Color3"
	| "Enum.SurfaceType"
	| "Enum.Material"
	| "Vector3"
	| "CFrame";
export type PROP_OBJ = {
	n: string;
	t: PROP_TYPE;
};
export type PROP_NAME = {
	Archivable: true;
	ClassName: true;
	Name: true;
	Parent: true;
	Anchored: true;
	BackSurface: true;
	BottomSurface: true;
	BrickColor: true;
	CFrame: true;
	CanCollide: true;
	CanQuery: true;
	CanTouch: true;
	CastShadow: true;
	CollisionGroup: true;
	Color: true;
	FrontSurface: true;
	LeftSurface: true;
	Locked: true;
	Massless: true;
	Material: true;
	MaterialVariant: true;
	Orientation: true;
	PivotOffset: true;
	Position: true;
	RightSurface: true;
	Rotation: true;
	Size: true;
	TopSurface: true;
	Transparency: true;
	Origin: true;
	PrimaryPart: true;
	Attachment0: true;
	Attachment1: true;
	Brightness: true;
};
export const INSTANCE_PROPERTIES: PROP_OBJ[] = (() => {
	const rtn: PROP_OBJ[] = [];
	function Def(prop_name: keyof PROP_NAME, prop_type: PROP_TYPE) {
		rtn.push({
			n: prop_name,
			t: prop_type,
		});
	}
	Def("Archivable", "boolean");
	Def("ClassName", "string");
	Def("Name", "string");
	Def("Parent", "Instance");
	Def("Anchored", "boolean");
	Def("BackSurface", "Enum.SurfaceType");
	Def("BottomSurface", "Enum.SurfaceType");
	Def("BrickColor", "BrickColor");
	Def("CFrame", "CFrame");
	Def("CanCollide", "boolean");
	Def("CanQuery", "boolean");
	Def("CanTouch", "boolean");
	Def("CastShadow", "boolean");
	Def("CollisionGroup", "string");
	Def("Color", "Color3");
	Def("FrontSurface", "Enum.SurfaceType");
	Def("LeftSurface", "Enum.SurfaceType");
	Def("Locked", "boolean");
	Def("Massless", "boolean");
	Def("Material", "Enum.Material");
	Def("MaterialVariant", "string");
	Def("Orientation", "Vector3");
	Def("PivotOffset", "CFrame");
	Def("Position", "Vector3");
	Def("RightSurface", "Enum.SurfaceType");
	Def("Rotation", "Vector3");
	Def("Size", "Vector3");
	Def("TopSurface", "Enum.SurfaceType");
	Def("Transparency", "number");
	Def("Origin", "CFrame");
	Def("PrimaryPart", "Instance");
	Def("Attachment0", "Instance");
	Def("Attachment1", "Instance");
	Def("Brightness", "number");
	return rtn;
})();

export interface PropItem {
	property_name: string;
	property_type: PROP_TYPE;
	property_value:
		| boolean
		| number
		| string
		| Instance
		| BrickColor
		| Color3
		| Enum.SurfaceType
		| Enum.Material
		| Vector3
		| CFrame
		| undefined;
}
export class InstanceInfo {
	i: Instance;
	props_arr: PROP_OBJ[] = [];
	props_map: {
		[prop_name: string]: string;
	} = {};

	constructor(i: Instance) {
		this.i = i;
		this.props_arr = INSTANCE_PROPERTIES.filter((p) => {
			if ((i as unknown as { [instance_prop: string]: boolean })[p.n]) return true;
			else return false;
		});
		this.props_arr.forEach((p) => {
			this.props_map[p.n] = p.t;
		});
	}

	GetProperty<PType>(prop_name: string): PType | undefined {
		return (this.i as unknown as { [instance_prop: string]: PType })[this.props_map[prop_name]];
	}

	SetProperty<PType>(prop_name: string, prop_value: PType) {
		(this.i as unknown as { [instance_prop: string]: PType })[this.props_map[prop_name]] = prop_value;
	}

	GetAllProperties(): PropItem[] {
		const rtn: PropItem[] = [];
		this.props_arr.forEach((p) => {
			const prop: PropItem = {
				property_name: p.n,
				property_type: p.t,
				property_value: undefined,
			};
			const property_value = (this.i as unknown as { [instance_prop: string]: unknown })[p.n];
			if (p.t === "boolean") prop.property_value = property_value as boolean;
			if (p.t === "number") prop.property_value = property_value as number;
			if (p.t === "string") prop.property_value = property_value as string;
			if (p.t === "Instance") prop.property_value = property_value as Instance;
			if (p.t === "BrickColor") prop.property_value = property_value as BrickColor;
			if (p.t === "Color3") prop.property_value = property_value as Color3;
			if (p.t === "Enum.SurfaceType") prop.property_value = property_value as Enum.SurfaceType;
			if (p.t === "Enum.Material") prop.property_value = property_value as Enum.Material;
			if (p.t === "Vector3") prop.property_value = property_value as Vector3;
			if (p.t === "CFrame") prop.property_value = property_value as CFrame;
			rtn.push(prop);
		});
		return rtn;
	}
}
