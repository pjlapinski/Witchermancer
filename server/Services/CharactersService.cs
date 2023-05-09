using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Witchermancer.Models.Characters;
using Witchermancer.Models.Config;

namespace Witchermancer.Services;

public class CharactersService
{
    private readonly IMongoCollection<Character> _charactersCollection;

    public CharactersService(IOptions<CharactersStoreDatabaseSettings> charactersStoreDatabaseSettings)
    {
        var client = new MongoClient(charactersStoreDatabaseSettings.Value.ConnectionString);
        var db = client.GetDatabase(charactersStoreDatabaseSettings.Value.DatabaseName);
        _charactersCollection =
            db.GetCollection<Character>(charactersStoreDatabaseSettings.Value.CharactersCollectionName);
    }

    public async Task<Character?> GetByIdAsync(string id) =>
        await _charactersCollection.Find(c => c.Id.ToString() == id).FirstOrDefaultAsync();

    public async Task<List<Character>> GetByEmailAsync(string email) =>
        await _charactersCollection.Find(c => c.OwnerEmail == email).ToListAsync();

    public async Task<Character> CreateAsync(Character character)
    {
        await _charactersCollection.InsertOneAsync(character);
        return character;
    }

    public async Task UpdateAsync(Character character) =>
        await _charactersCollection.ReplaceOneAsync(c => c.Id == character.Id, character);

    public async Task DeleteAsync(string id) =>
        await _charactersCollection.DeleteOneAsync(c => c.Id.ToString() == id);
}
