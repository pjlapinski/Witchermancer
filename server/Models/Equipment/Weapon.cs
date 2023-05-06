namespace Witchermancer.Models.Equipment;

public record Weapon(
    string Name,
    string Type,
    int Accuracy,
    DieRoll Damage,
    int Reliability,
    int HandsRequired,
    string Range,
    string Effect,
    string Concealment,
    ItemEnhancements Enhancements,
    float Weight
);