// ============================================================
//  COMMAND PATTERN — Imperial Building Commands
//  "Mandatum datum, mandatum executum"
//
//  Compile:  g++ -std=c++17 -o mandatum mandatum.cpp
//  Run:      ./mandatum
// ============================================================
#include <iostream>
#include <memory>
#include <vector>
#include <stack>
#include <string>
#include <algorithm>
using namespace std;

// ─── RECEIVER ────────────────────────────────────────────────
class RomeArchitect {
    vector<string> buildings;
public:
    string build(const string& s) {
        buildings.push_back(s);
        string all; for(auto& b:buildings) all+=b+", ";
        return "🏛  " + s + " BUILT! [" + all.substr(0,all.size()-2) + "]";
    }
    string demolish(const string& s) {
        buildings.erase(remove(buildings.begin(),buildings.end(),s),buildings.end());
        string all; for(auto& b:buildings) all+=b+", ";
        return "🔨 " + s + " DEMOLISHED! [" + (all.empty()?"empty":all.substr(0,all.size()-2)) + "]";
    }
};

// ─── COMMAND INTERFACE ───────────────────────────────────────
struct ImperialCommand {
    virtual ~ImperialCommand() = default;
    virtual string execute() = 0;
    virtual string undo()    = 0;
    virtual string name()    = 0;
};

// ─── CONCRETE COMMANDS ───────────────────────────────────────
class BuildCmd : public ImperialCommand {
    RomeArchitect& _arch;
    string _building;
public:
    BuildCmd(RomeArchitect& a, string b) : _arch(a), _building(move(b)) {}
    string execute() override { return _arch.build(_building); }
    string undo()    override { return _arch.demolish(_building); }
    string name()    override { return "Build " + _building; }
};

// ─── INVOKER ─────────────────────────────────────────────────
class ImperialPalace {
    stack<shared_ptr<ImperialCommand>> history;
    stack<shared_ptr<ImperialCommand>> undone;
public:
    string issue(shared_ptr<ImperialCommand> cmd) {
        string r = cmd->execute();
        history.push(cmd);
        while(!undone.empty()) undone.pop();
        return r;
    }
    string undoLast() {
        if (history.empty()) return "Nothing to undo, Caesar!";
        auto cmd = history.top(); history.pop();
        undone.push(cmd);
        return cmd->undo();
    }
    string redoLast() {
        if (undone.empty()) return "Nothing to redo!";
        auto cmd = undone.top(); undone.pop();
        history.push(cmd);
        return cmd->execute();
    }
};

int main() {
    cout << "╔═══════════════════════════════════════════════╗\n";
    cout << "║   COMMAND PATTERN — C++                       ║\n";
    cout << "║   Imperial Building Commands                  ║\n";
    cout << "╚═══════════════════════════════════════════════╝\n\n";

    RomeArchitect arch;
    ImperialPalace palace;

    cout << "── ISSUING COMMANDS ────────────────────────────\n";
    cout << palace.issue(make_shared<BuildCmd>(arch, "Colosseum"))           << "\n";
    cout << palace.issue(make_shared<BuildCmd>(arch, "Aqua Claudia"))        << "\n";
    cout << palace.issue(make_shared<BuildCmd>(arch, "Temple of Jupiter"))   << "\n";

    cout << "\n── VESPASIAN CHANGES HIS MIND ──────────────────\n";
    cout << palace.undoLast() << "\n";  // Undo Temple
    cout << palace.undoLast() << "\n";  // Undo Aqueduct

    cout << "\n── AND BACK AGAIN ──────────────────────────────\n";
    cout << palace.redoLast() << "\n";  // Redo Aqueduct

    cout << "\n\"Mandatum datum, mandatum executum!\"\n";
    return 0;
}
