using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Witchermancer.Models.Characters.Statistics;
using Witchermancer.Models.Equipment;
using Witchermancer.Models.Magic;

namespace Witchermancer.Models.Characters;

public class Character
{
    [BsonId, BsonRepresentation(BsonType.ObjectId)]
    public ObjectId? Id { get; set; }

    public string? IdString { get; set; }
    public string? OwnerEmail { get; set; }
    public string Name { get; set; }
    public Race Race { get; set; }
    public string Gender { get; set; }
    public int Age { get; set; }
    public CharacterStatistics Statistics { get; set; }
    public Profession Profession { get; set; }
    public int ImprovementPoints { get; set; }
    public string Reputation { get; set; }
    public string SocialStanding { get; set; }
    public string LifePath { get; set; }
    public Gear[] Gear { get; set; }
    public int Money { get; set; }
    public Weapon[] Weapons { get; set; }
    public EquippedArmor Armor { get; set; }
    public int CurrentHealthPoints { get; set; }
    public int CurrentStamina { get; set; }
    public int CurrentStun { get; set; }
    public Spell[] Spells { get; set; }
    public Hex[] Hexes { get; set; }
    public Ritual[] Rituals { get; set; }
    public Dictionary<string, float> Modifiers { get; set; }
}
