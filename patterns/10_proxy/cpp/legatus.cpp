// ============================================================
//  PROXY PATTERN — The Imperial Legatus
//  "Legatus vocem imperatoris habet"
//  The delegate has the emperor's voice
//
//  Compile:  g++ -std=c++17 -o legatus legatus.cpp
//  Run:      ./legatus
// ============================================================
#include <iostream>
#include <memory>
#include <map>
#include <set>
#include <string>
using namespace std;

struct IImperialService {
    virtual string issueDecree(const string& p, const string& d) = 0;
    virtual string getCensus(const string& p) = 0;
    virtual ~IImperialService() = default;
};

class EmperorHadrian : public IImperialService {
public:
    EmperorHadrian() { cout << "  👑 Emperor Hadrian awakens from his afternoon nap!\n"; }
    string issueDecree(const string& p, const string& d) override {
        return "👑 IMPERIAL DECREE for " + p + ": '" + d + "' — Signed, Hadrianus P.P.";
    }
    string getCensus(const string& p) override {
        return "👑 Census of " + p + ": Population ~50,000 (all paying taxes... mostly)";
    }
};

class LegateProxy : public IImperialService {
    unique_ptr<EmperorHadrian> _emperor;
    map<string,string>         _cache;
    set<string>                _authorized{"Syria","Aegyptus","Britannia","Gallia","Hispania"};
    int                        _requestCount = 0;

    EmperorHadrian& getEmperor() {
        if (!_emperor) {
            cout << "  [Proxy] First real request — waking the Emperor...\n";
            _emperor = make_unique<EmperorHadrian>();
        }
        return *_emperor;
    }
    void log(const string& action) {
        cout << "  [Log #" << ++_requestCount << "] " << action << "\n";
    }
public:
    string issueDecree(const string& p, const string& d) override {
        log("Decree request for '" + p + "'");
        if (!_authorized.count(p))
            return "🚫 ACCESS DENIED: '" + p + "' is not an authorized province!";
        return getEmperor().issueDecree(p, d);
    }
    string getCensus(const string& p) override {
        log("Census request for '" + p + "'");
        auto it = _cache.find(p);
        if (it != _cache.end()) {
            cout << "  [Cache HIT] Returning cached census for " << p << "\n";
            return it->second;
        }
        auto result = getEmperor().getCensus(p);
        _cache[p] = result;
        return result;
    }
    int requestCount() const { return _requestCount; }
};

int main() {
    cout << "╔═══════════════════════════════════════════════╗\n";
    cout << "║   PROXY PATTERN — C++                         ║\n";
    cout << "║   The Imperial Legatus                        ║\n";
    cout << "╚═══════════════════════════════════════════════╝\n\n";

    IImperialService* svc = new LegateProxy();

    cout << "── PROTECTION PROXY: Unauthorized Request ──────\n";
    cout << svc->issueDecree("Barbaria", "Build roads!") << "\n";

    cout << "\n── AUTHORIZED REQUESTS (lazy-init Emperor) ─────\n";
    cout << svc->issueDecree("Britannia", "Build Hadrian's Wall") << "\n";
    cout << svc->issueDecree("Syria",     "Increase grain quota") << "\n";

    cout << "\n── CACHING PROXY: Census Requests ──────────────\n";
    cout << svc->getCensus("Aegyptus") << "\n";
    cout << "\n  (Second call — same province)\n";
    cout << svc->getCensus("Aegyptus") << "\n";  // From cache!

    cout << "\n── SUMMARY ─────────────────────────────────────\n";
    cout << "  Total requests handled by proxy: "
         << static_cast<LegateProxy*>(svc)->requestCount() << "\n";
    cout << "  Emperor was only woken ONCE (lazy init)\n";
    cout << "  \"Legatus vocem imperatoris habet!\"\n";

    delete svc;
    return 0;
}
