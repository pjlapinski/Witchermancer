namespace Witchermancer.Models.Equipment;

public record Armor(
    string Name,
    int StoppingPower,
    ItemEnhancements Enhancements,
    string Effect,
    int EncumbranceValue,
    string Notes,
    float Weight
);
