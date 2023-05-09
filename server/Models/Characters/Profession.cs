namespace Witchermancer.Models.Characters;

public record Profession(string Name, int Vigor, ProfessionAbility Skill, ProfessionAbility[] Abilities);