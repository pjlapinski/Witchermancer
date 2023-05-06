namespace Witchermancer.Models.Character;

public record Profession(string Name, int Vigor, ProfessionAbility Skill, ProfessionAbility[] Abilities);
