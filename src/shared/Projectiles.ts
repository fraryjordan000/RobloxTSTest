export interface ProjectileOptions {
    bullet_width: number;
    bullet_length: number;

    damage_team_names: string[];

    color: Color3;

    velocity: number;
    min_damage: number;
    max_damage: number;
    range_min: number;
    range_max: number;

    exclude: Instance[];

    hit_character: (i: Instance) => Player | undefined;
    apply_damage: (p: Player, d: number) => void;
    on_hit: (pos: Vector3) => void;
}

export function NewProjectileOptions(): ProjectileOptions {
    return {
        bullet_width: 1,
        bullet_length: 3,

        damage_team_names: [],

        color: Color3.fromRGB(255, 255, 255),

        velocity: 1000,
        min_damage: 10,
        max_damage: 25,
        range_min: 10,
        range_max: 50,

        exclude: [],

        hit_character: i => {
            let rtn;
            game.GetService("Players").GetPlayers().map(p => {
                if(p.Character && i.IsDescendantOf(p.Character)) rtn = p;
            })
            return rtn;
        },
        apply_damage: (p, d) => {
            if(p.Character) {
                let h = p.Character.FindFirstChildOfClass("Humanoid");
                if(h) h.TakeDamage(d);
            }
        },
        on_hit: p => {},
    }
}

export function SpawnProjectile(opts: ProjectileOptions, spawn_pos: Vector3, travel_vec: Vector3, owner?: Player): Part {
    let new_projectile = new Instance("Part");
    new_projectile.Size = new Vector3(opts.bullet_width, opts.bullet_width, opts.bullet_length);
    new_projectile.Color = opts.color;
    new_projectile.CanCollide = false;
    new_projectile.CanQuery = false;
    new_projectile.CanTouch = true;

    new_projectile.Parent = game.Workspace;
    new_projectile.CFrame = CFrame.lookAt(spawn_pos, spawn_pos.add(travel_vec));
    new_projectile.AssemblyLinearVelocity = travel_vec.mul(opts.velocity);

    let t_conn = new_projectile.Touched.Connect(other => {
        if(opts.exclude.filter(e => (e === other) || (other.IsDescendantOf(e))).size() > 0) return;
        t_conn.Disconnect();
        opts.on_hit(other.Position);
        let hit_character = opts.hit_character(other);
        if(hit_character) {
            let can_damage = false;
            if(opts.damage_team_names.size() > 0) {
                if(hit_character.Team && opts.damage_team_names.includes(hit_character.Team.Name)) can_damage = true;
            } else if(owner) {
                if(hit_character.Team !== owner.Team) can_damage = true;
            } else {
                can_damage = true;
            }
            if(can_damage) {
                let dist = new_projectile.Position.sub(spawn_pos).Magnitude;
                if(dist < opts.range_min) dist = opts.range_min;
                if(dist > opts.range_max) dist = opts.range_max;
                let dist_factor = (dist - opts.range_min) / (opts.range_max - opts.range_min);
                opts.apply_damage(hit_character as Player, (dist_factor * (opts.max_damage - opts.min_damage)) + opts.min_damage);
            }
        }
        new_projectile.Destroy();
    });

    if(owner) new_projectile.SetNetworkOwner(owner);

    return new_projectile;
}