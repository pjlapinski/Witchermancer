using Witchermancer.Models.Equipment;

namespace Witchermancer.Models.Characters;

public record EquippedArmor(
    Armor? Head,
    Armor? Torso,
    Armor? Legs,
    Armor? Shield
);