// ============================================================
//  CQRS PATTERN — The Two Consuls
//  "Qui legit non scribit; qui scribit non legit"
//
//  Compile:  g++ -std=c++17 -o consules consules.cpp
//  Run:      ./consules
// ============================================================
#include <iostream>
#include <map>
#include <vector>
#include <string>
using namespace std;

struct Legion { string id, name, province; int strength; bool active=true; };
struct Event  { string type, legionId, name, province; int strength=0; };

// Write model — normalized
class WriteStore {
public:
    map<string,Legion> legions;
    vector<Event>      events;
    void apply(const Event& e, const Legion& l={}) {
        events.push_back(e);
        if(e.type=="ENROLL") legions[l.id]=l;
        if(e.type=="DEPLOY") legions[e.legionId].province=e.province;
    }
};

// Read model — denormalized for fast queries
class ReadStore {
public:
    map<string,Legion> views;
    void project(const Event& e, const Legion& l={}) {
        if(e.type=="ENROLL") views[l.id]=l;
        if(e.type=="DEPLOY") { views[e.legionId].province=e.province; }
    }
    vector<Legion> query(const string& province="") {
        vector<Legion> r;
        for(auto& [k,v]:views)
            if(v.active&&(province.empty()||v.province==province)) r.push_back(v);
        return r;
    }
};

// Commanding Consul (writes)
class CommandConsul {
    WriteStore& w; ReadStore& r; int _id=0;
public:
    CommandConsul(WriteStore& ws, ReadStore& rs):w(ws),r(rs){}
    string enroll(const string& n, const string& p, int s) {
        string id="leg-"+to_string(++_id);
        Legion l{id,n,p,s};
        Event e{"ENROLL",id,n,p,s};
        w.apply(e,l); r.project(e,l);
        cout<<"  ⚔  ENROLLED: "<<n<<" ["<<id<<"]\n";
        return id;
    }
    void deploy(const string& id, const string& p) {
        Event e{"DEPLOY",id,"",p};
        w.apply(e); r.project(e);
        cout<<"  ⚔  DEPLOYED: "<<id<<" → "<<p<<"\n";
    }
};

// Reading Consul (reads)
class QueryConsul {
    ReadStore& r;
public:
    QueryConsul(ReadStore& rs):r(rs){}
    void listActive(const string& province="") {
        auto legs=r.query(province);
        string label = province.empty() ? "all provinces" : province;
        cout<<"  📖 QUERY: Active legions in "<<label<<":\n";
        for(auto& l:legs)
            cout<<"    🦅 "<<l.name<<" ["<<l.id<<"] in "<<l.province<<" ("<<l.strength<<" soldiers)\n";
    }
};

int main() {
    cout<<"╔═══════════════════════════════════════════════╗\n";
    cout<<"║   CQRS PATTERN — C++                          ║\n";
    cout<<"║   The Two Consuls                             ║\n";
    cout<<"╚═══════════════════════════════════════════════╝\n\n";

    WriteStore ws; ReadStore rs;
    CommandConsul cmdConsul(ws, rs);
    QueryConsul   queryConsul(rs);

    cout<<"── COMMANDING CONSUL (Write Side) ──────────────\n";
    auto id1 = cmdConsul.enroll("Legio I Germanica",   "Gallia",   5000);
    auto id2 = cmdConsul.enroll("Legio X Gemina",      "Hispania", 4800);
    auto id3 = cmdConsul.enroll("Legio XII Fulminata", "Gallia",   4200);
    cmdConsul.deploy(id1, "Germania");

    cout<<"\n── READING CONSUL (Query Side) ─────────────────\n";
    queryConsul.listActive();
    cout<<"\n";
    queryConsul.listActive("Germania");

    cout<<"\n\"Qui legit non scribit; qui scribit non legit!\"\n";
    return 0;
}
