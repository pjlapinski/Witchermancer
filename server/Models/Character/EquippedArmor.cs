using Witchermancer.Models.Equipment;

namespace Witchermancer.Models.Character;

public record EquippedArmor(
    Armor? Head,
    Armor? Torso,
    Armor? Legs,
    Armor? Shield
);
