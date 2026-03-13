// ============================================================
//  REPOSITORY PATTERN — The Imperial Archive (Tabularium)
//  "Ubi data est? Tabularius scit"
//  Where is the data? The archivist knows.
//
//  Compile:  g++ -std=c++17 -o tabularium tabularium.cpp
//  Run:      ./tabularium
// ============================================================
#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <optional>
#include <algorithm>
using namespace std;

struct Centurion {
    string id, name, legion, rank;
    int battlesWon;
};

class ICenturionRepository {
public:
    virtual ~ICenturionRepository() = default;
    virtual optional<Centurion>  findById(const string& id)        = 0;
    virtual vector<Centurion>    findByLegion(const string& legion) = 0;
    virtual vector<Centurion>    findAll()                          = 0;
    virtual void                 save(const Centurion& c)           = 0;
    virtual bool                 remove(const string& id)           = 0;
};

class InMemoryCenturionRepo : public ICenturionRepository {
    map<string,Centurion> _store;
public:
    optional<Centurion> findById(const string& id) override {
        auto it = _store.find(id);
        return it != _store.end() ? optional<Centurion>{it->second} : nullopt;
    }
    vector<Centurion> findByLegion(const string& l) override {
        vector<Centurion> res;
        for (auto& [k,v] : _store) if (v.legion==l) res.push_back(v);
        return res;
    }
    vector<Centurion> findAll() override {
        vector<Centurion> res;
        for (auto& [k,v] : _store) res.push_back(v);
        return res;
    }
    void save(const Centurion& c) override {
        _store[c.id] = c;
        cout << "  📚 Saved: " << c.name << " (" << c.rank << ") [" << c.id << "]\n";
    }
    bool remove(const string& id) override { return _store.erase(id) > 0; }
};

class CenturionService {
    ICenturionRepository& _repo;
public:
    CenturionService(ICenturionRepository& r) : _repo(r) {}
    void promoteBest(const string& legion) {
        auto all = _repo.findByLegion(legion);
        if (all.empty()) { cout << "  No centurions in " << legion << "\n"; return; }
        auto best = *max_element(all.begin(), all.end(),
            [](const Centurion& a, const Centurion& b){ return a.battlesWon < b.battlesWon; });
        best.rank = "Primus Pilus";
        _repo.save(best);
        cout << "  🎖  " << best.name << " promoted to Primus Pilus! (" << best.battlesWon << " battles)\n";
    }
};

int main() {
    cout << "╔═══════════════════════════════════════════════╗\n";
    cout << "║   REPOSITORY PATTERN — C++                    ║\n";
    cout << "║   The Imperial Archive (Tabularium)           ║\n";
    cout << "╚═══════════════════════════════════════════════╝\n\n";

    InMemoryCenturionRepo repo;
    repo.save({"c1","Marcus Aurelius",  "Legio X","Centurion",15});
    repo.save({"c2","Gaius Petronius",  "Legio X","Centurion",23});
    repo.save({"c3","Publius Quinctius","Legio XII","Centurion",7});
    repo.save({"c4","Titus Labienus",   "Legio X","Centurion",31});

    cout << "\n── QUERY: All Legio X Centurions ───────────────\n";
    for (auto& c : repo.findByLegion("Legio X"))
        cout << "  " << c.name << " — " << c.battlesWon << " battles\n";

    cout << "\n── SERVICE: Promote Best in Legio X ────────────\n";
    CenturionService svc(repo);
    svc.promoteBest("Legio X");

    cout << "\n── VERIFY PROMOTION ────────────────────────────\n";
    auto found = repo.findById("c4");
    if (found) cout << "  " << found->name << " is now: " << found->rank << "\n";

    cout << "\n\"Ubi data est? Tabularius scit!\"\n";
    return 0;
}
