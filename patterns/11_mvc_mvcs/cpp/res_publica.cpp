// ============================================================
//  MVC/MVCS PATTERN — The Roman Republic
//  "Divide et impera" — Divide and rule
//
//  Compile:  g++ -std=c++17 -o res_publica res_publica.cpp
//  Run:      ./res_publica
// ============================================================
#include <iostream>
#include <vector>
#include <string>
#include <numeric>
#include <algorithm>
using namespace std;

// ─── MODEL ──────────────────────────────────────────────────
struct Legion { int id; string name, province; int strength; bool active=true; };
class LegionModel {
    vector<Legion> _l; int _id=1;
public:
    Legion add(const string& n, int s, const string& p) {
        Legion l{_id++,n,p,s};_l.push_back(l);return l;
    }
    vector<Legion>& getAll() { return _l; }
    vector<Legion> getByProvince(const string& p) {
        vector<Legion> r;
        for(auto& l:_l) if(l.province==p) r.push_back(l);
        return r;
    }
    void updateStrength(int id, int s) {
        for(auto& l:_l) if(l.id==id){l.strength=s;return;}
    }
    int totalStrength() {
        return accumulate(_l.begin(),_l.end(),0,[](int s,const Legion& l){return s+l.strength;});
    }
};

// ─── VIEW ───────────────────────────────────────────────────
class LegionView {
public:
    void renderList(const vector<Legion>& legs) {
        cout << "\n  ╔══ IMPERIAL LEGION REGISTRY (SPQR) ══╗\n";
        for(const auto& l:legs)
            cout << "  ║ ["<<l.id<<"] "<<l.name<<" | "<<l.province<<" | "<<l.strength<<" soldiers ║\n";
        cout << "  ╚══════════════════════════════════════╝\n";
    }
    void showMsg(const string& m) { cout << "  📢 " << m << "\n"; }
    void showStrength(int n) { cout << "  ⚔  Total imperial strength: " << n << " soldiers\n"; }
};

// ─── SERVICE ────────────────────────────────────────────────
class LegionService {
    LegionModel& _m;
public:
    LegionService(LegionModel& m):_m(m){}
    string reinforce(const string& province, int troops) {
        auto legs = _m.getByProvince(province);
        if(legs.empty()) return "No legions in "+province;
        int per = troops / (int)legs.size();
        for(auto& l:legs) _m.updateStrength(l.id, l.strength+per);
        return "+" + to_string(troops) + " troops to " + to_string(legs.size())
             + " legion(s) in " + province;
    }
};

// ─── CONTROLLER ─────────────────────────────────────────────
class LegionController {
    LegionModel& _m; LegionView& _v; LegionService& _s;
public:
    LegionController(LegionModel& m, LegionView& v, LegionService& s):_m(m),_v(v),_s(s){}
    void addLegion(const string& n, int str, const string& p) {
        _m.add(n,str,p); _v.showMsg("Legion '"+n+"' enrolled");
        _v.renderList(_m.getAll());
    }
    void reinforce(const string& p, int count) {
        _v.showMsg(_s.reinforce(p,count)); _v.renderList(_m.getAll());
    }
    void showStrength() { _v.showStrength(_m.totalStrength()); }
};

int main() {
    cout << "╔═══════════════════════════════════════════════╗\n";
    cout << "║   MVC/MVCS PATTERN — C++                      ║\n";
    cout << "║   The Roman Republic                          ║\n";
    cout << "╚═══════════════════════════════════════════════╝\n\n";

    LegionModel   model;
    LegionView    view;
    LegionService service(model);
    LegionController ctrl(model, view, service);

    ctrl.addLegion("Legio I Germanica",   5000, "Germania");
    ctrl.addLegion("Legio X Gemina",      4800, "Hispania");
    ctrl.addLegion("Legio XII Fulminata", 4200, "Germania");

    cout << "\n── REINFORCE GERMANIA ──────────────────────────\n";
    ctrl.reinforce("Germania", 3000);
    ctrl.showStrength();

    cout << "\n\"Divide et impera!\"\n";
    return 0;
}
