namespace Witchermancer.Models.Equipment;

public record Weapon(
    string Name,
    string Type,
    int Accuracy,
    DieRoll Damage,
    int Reliability,
    string Range,
    string Effect,
    string Concealment,
    ItemEnhancements Enhancements,
    string Notes,
    float Weight
);
