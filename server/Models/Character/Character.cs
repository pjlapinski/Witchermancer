using Witchermancer.Models.Character.Statistics;
using Witchermancer.Models.Equipment;
using Witchermancer.Models.Magic;

namespace Witchermancer.Models.Character;

public record Character(
    string Name,
    Race Race,
    string Gender,
    int Age,
    CharacterStatistics Statistics,
    Profession Profession,
    int ImprovementPoints,
    string Reputation,
    string SocialStanding,
    string LifePath,
    Gear[] Gear,
    int Money,
    Weapon[] Weapons,
    int PrimaryWeaponIdx,
    EquippedArmor Armor,
    int CurrentHealthPoints,
    int CurrentStamina,
    int CurrentStun,
    int CurrentVigor,
    Spell[] Spells,
    Hex[] Hexes,
    Ritual[] Rituals,
    Dictionary<string, int> Modifiers
);