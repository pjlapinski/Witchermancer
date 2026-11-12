using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Witchermancer.Models.Characters;
using Witchermancer.Models.Config;

namespace Witchermancer.Services;

public class CharactersService
{
    private readonly IMongoCollection<Character> _charactersCollection;
    private readonly MongoClient _client;
    private readonly TransactionOptions _transactionOptions;

    public CharactersService(IOptions<CharactersStoreDatabaseSettings> charactersStoreDatabaseSettings)
    {
        _client = new MongoClient(charactersStoreDatabaseSettings.Value.ConnectionString);
        var db = _client.GetDatabase(charactersStoreDatabaseSettings.Value.DatabaseName);
        _charactersCollection =
            db.GetCollection<Character>(charactersStoreDatabaseSettings.Value.CharactersCollectionName);
        _transactionOptions = new TransactionOptions(
            readConcern: ReadConcern.Majority,
            writeConcern: WriteConcern.WMajority
        );
    }

    public async Task<Character?> GetByIdAsync(string id) =>
        await _charactersCollection.Find(c => c.IdString == id).FirstOrDefaultAsync();

    public async Task<List<Character>> GetByEmailAsync(string email) =>
        await _charactersCollection.Find(c => c.OwnerEmail == email).ToListAsync();

    public async Task<Character> CreateAsync(Character character)
    {
        character.Id = ObjectId.GenerateNewId();
        character.IdString = character.Id.ToString();
        using var session = await _client.StartSessionAsync();
        session.StartTransaction(_transactionOptions);
        await _charactersCollection.InsertOneAsync(character);
        await session.CommitTransactionAsync();
        return character;
    }

    public async Task UpdateAsync(Character character)
    {
        using var session = await _client.StartSessionAsync();
        session.StartTransaction(_transactionOptions);
        await _charactersCollection.ReplaceOneAsync(c => c.Id == character.Id, character);
        await session.CommitTransactionAsync();
    }

    public async Task DeleteAsync(string id)
    {
        using var session = await _client.StartSessionAsync();
        session.StartTransaction(_transactionOptions);
        await _charactersCollection.DeleteOneAsync(c => c.IdString == id);
        await session.CommitTransactionAsync();
    }
}
