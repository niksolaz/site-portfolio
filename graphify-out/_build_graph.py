import json

SK = '/home/niksolaz/dev/site-portfolio/.hermes/skills/graphify/SKILL.md'
AW = '/home/niksolaz/dev/site-portfolio/.hermes/skills/graphify/references/add-watch.md'
EX = '/home/niksolaz/dev/site-portfolio/.hermes/skills/graphify/references/exports.md'
ES = '/home/niksolaz/dev/site-portfolio/.hermes/skills/graphify/references/extraction-spec.md'
GM = '/home/niksolaz/dev/site-portfolio/.hermes/skills/graphify/references/github-and-merge.md'
HK = '/home/niksolaz/dev/site-portfolio/.hermes/skills/graphify/references/hooks.md'
QR = '/home/niksolaz/dev/site-portfolio/.hermes/skills/graphify/references/query.md'
TR = '/home/niksolaz/dev/site-portfolio/.hermes/skills/graphify/references/transcribe.md'
UP = '/home/niksolaz/dev/site-portfolio/.hermes/skills/graphify/references/update.md'
AG = '/home/niksolaz/dev/site-portfolio/AGENTS.md'
RM = '/home/niksolaz/dev/site-portfolio/README.md'
MC = '/home/niksolaz/dev/site-portfolio/src/app/api/chat/mantis-summary.md'
MB = '/home/niksolaz/dev/site-portfolio/src/app/blogs/mantis-summary.md'
MA = '/home/niksolaz/dev/site-portfolio/src/app/mantis-summary.md'
MP = '/home/niksolaz/dev/site-portfolio/src/components/mantis-summary.md'
MH = '/home/niksolaz/dev/site-portfolio/src/hooks/mantis-summary.md'
ML = '/home/niksolaz/dev/site-portfolio/src/lib/mantis-summary.md'
MS = '/home/niksolaz/dev/site-portfolio/src/mantis-summary.md'
MT = '/home/niksolaz/dev/site-portfolio/src/store/mantis-summary.md'
MY = '/home/niksolaz/dev/site-portfolio/src/types/mantis-summary.md'

nodes = []
edges = []
hyperedges = []

def N(id_val, label, ftype, sf, rat=None):
    n = {"id": id_val, "label": label, "file_type": ftype, "source_file": sf,
         "source_location": None, "source_url": None, "captured_at": None,
         "author": None, "contributor": None}
    if rat:
        n["rationale"] = rat
    nodes.append(n)

def E(s, t, rel, conf, cs, sf):
    edges.append({"source": s, "target": t, "relation": rel, "confidence": conf,
                  "confidence_score": cs, "source_file": sf,
                  "source_location": None, "weight": 1.0})

def H(id_val, label, nlist, rel, conf, cs, sf):
    hyperedges.append({"id": id_val, "label": label, "nodes": nlist,
                       "relation": rel, "confidence": conf,
                       "confidence_score": cs, "source_file": sf})

# ===== SKILL.md =====
N("hermes_skills_graphify_skill_graphify_tool", "Graphify Tool", "concept", SK)
N("hermes_skills_graphify_skill_knowledge_graph", "Knowledge Graph", "concept", SK)
N("hermes_skills_graphify_skill_graphify_pipeline", "Graphify Pipeline (Steps 0-9)", "rationale", SK,
  "Multi-step pipeline: detect, transcribe, extract (AST+semantic), build, cluster, analyze, report, export.")
N("hermes_skills_graphify_skill_graphify_out", "graphify-out/ Output Directory", "concept", SK)
N("hermes_skills_graphify_skill_extracted_confidence", "EXTRACTED Confidence Level", "rationale", SK,
  "Relationship explicit in source: import, call, or citation. Always scored 1.0.")
N("hermes_skills_graphify_skill_inferred_confidence", "INFERRED Confidence Level", "rationale", SK,
  "Reasonable inference: shared structure, implied dependency. Scored 0.55-0.95.")
N("hermes_skills_graphify_skill_ambiguous_confidence", "AMBIGUOUS Confidence Level", "rationale", SK,
  "Uncertain relationship: flagged rather than omitted. Confidence scored 0.1-0.3.")
N("hermes_skills_graphify_skill_ast_extraction", "AST Structural Extraction (Part A)", "rationale", SK,
  "Deterministic, free, uses tree-sitter AST. No LLM needed. Extracts imports, calls, definitions from code.")
N("hermes_skills_graphify_skill_semantic_extraction", "Semantic Extraction (Part B)", "rationale", SK,
  "LLM-based extraction for docs, papers, and images. Uses Gemini if GEMINI_API_KEY set; otherwise host agent is the LLM.")
N("hermes_skills_graphify_skill_community_detection", "Community Detection (Clustering)", "rationale", SK)
N("hermes_skills_graphify_skill_god_nodes", "God Nodes", "concept", SK)
N("hermes_skills_graphify_skill_deep_mode", "DEEP_MODE (Aggressive Inference)", "rationale", SK,
  "Be aggressive with INFERRED edges: indirect deps, shared assumptions, latent couplings. Mark uncertain as AMBIGUOUS.")
N("hermes_skills_graphify_skill_subagents", "Parallel Subagents", "rationale", SK,
  "Up to 8 subagents run in parallel for semantic extraction. Each handles 20-25 files. Must use general-purpose agent type.")
N("hermes_skills_graphify_skill_honesty_rules", "Honesty Rules", "rationale", SK,
  "Never invent an edge, never skip corpus warnings, always show token cost, never hide cohesion scores behind symbols.")
N("hermes_skills_graphify_skill_graph_json", "graph.json Output", "concept", SK)
N("hermes_skills_graphify_skill_graph_report_md", "GRAPH_REPORT.md Audit Report", "concept", SK)
N("hermes_skills_graphify_skill_graph_html", "graph.html Interactive Visualization", "concept", SK)
N("hermes_skills_graphify_skill_fast_path", "Fast Path (Existing Graph Query)", "rationale", SK,
  "When graphify-out/graph.json exists and user asks a question, skip Steps 1-5 and go straight to query.")
N("hermes_skills_graphify_skill_parallel_ast_semantic", "Parallel AST + Semantic Strategy", "rationale", SK,
  "Run Part A (AST) and Part B (semantic) in parallel since they operate on different file types. Saves 5-15s.")
N("hermes_skills_graphify_skill_interpreter_guard", "Interpreter Guard (.graphify_python)", "rationale", SK,
  "Writes Python interpreter path to .graphify_python so all subsequent steps use the correct interpreter.")
N("hermes_skills_graphify_skill_gemini_api_key", "GEMINI_API_KEY / GOOGLE_API_KEY", "concept", SK)

# Graphify tool -> all its sub-concepts
sk_ids = [n["id"] for n in nodes if n["source_file"] == SK]
for nid in sk_ids:
    if nid != "hermes_skills_graphify_skill_graphify_tool":
        E("hermes_skills_graphify_skill_graphify_tool", nid, "conceptually_related_to", "EXTRACTED", 1.0, SK)

# SKILL.md references
E("hermes_skills_graphify_skill_semantic_extraction", "hermes_skills_graphify_references_extraction_spec_subagent_prompt", "references", "EXTRACTED", 1.0, SK)
E("hermes_skills_graphify_skill_semantic_extraction", "hermes_skills_graphify_skill_subagents", "conceptually_related_to", "EXTRACTED", 1.0, SK)
E("hermes_skills_graphify_skill_semantic_extraction", "hermes_skills_graphify_skill_gemini_api_key", "conceptually_related_to", "EXTRACTED", 1.0, SK)
E("hermes_skills_graphify_skill_subagents", "hermes_skills_graphify_references_extraction_spec_subagent_prompt", "references", "EXTRACTED", 1.0, SK)
E("hermes_skills_graphify_skill_fast_path", "hermes_skills_graphify_references_query_graphify_query", "references", "EXTRACTED", 1.0, SK)

# ===== add-watch.md =====
N("hermes_skills_graphify_references_add_watch_graphify_add", "graphify add (URL Ingestion)", "concept", AW)
N("hermes_skills_graphify_references_add_watch_graphify_watch", "graphify watch (File Watcher)", "concept", AW)
N("hermes_skills_graphify_references_add_watch_graphify_ingest", "graphify.ingest Module", "concept", AW)
N("hermes_skills_graphify_references_add_watch_url_support", "URL Type Auto-Detection", "rationale", AW,
  "Auto-detects URL type: YouTube via yt-dlp, Twitter via oEmbed, arXiv, PDF, images, web via html2text.")
N("hermes_skills_graphify_references_add_watch_code_change_rebuild", "Code-Only Watch Auto-Rebuild", "rationale", AW,
  "Watch triggers AST-only rebuild for code changes (no LLM); doc/paper/image changes set a needs_update flag for manual re-extraction.")

E("hermes_skills_graphify_references_add_watch_graphify_add", "hermes_skills_graphify_references_add_watch_graphify_ingest", "calls", "EXTRACTED", 1.0, AW)
E("hermes_skills_graphify_references_add_watch_graphify_watch", "hermes_skills_graphify_references_add_watch_code_change_rebuild", "conceptually_related_to", "EXTRACTED", 1.0, AW)
E("hermes_skills_graphify_references_add_watch_graphify_ingest", "hermes_skills_graphify_references_add_watch_url_support", "conceptually_related_to", "EXTRACTED", 1.0, AW)

# ===== exports.md =====
N("hermes_skills_graphify_references_exports_graphify_export_wiki", "graphify export wiki", "concept", EX)
N("hermes_skills_graphify_references_exports_graphify_export_neo4j", "graphify export neo4j", "concept", EX)
N("hermes_skills_graphify_references_exports_graphify_export_falkordb", "graphify export falkordb", "concept", EX)
N("hermes_skills_graphify_refrences_exports_gaphify_export_svg", "graphify export svg", "cncept", EX)
N("hermes_skills_graphify_references_exports_gaphify_export_graphml","graphify export gaphml","concept",EX)
N("hermes_skills_graphify_references_exports_graphify_export_mcp","graphify MCP Server","cncept",EX)
N("hermes_skills_graphify_references_exports_gaphify_benchmark","Token Reduction Benchmark","cncept",EX)

# ===== extraction-spec.md =====
N("hermes_skills_graphify_references_extractin_spec_subagent_prompt","Extraction Subagent Prompt Template","dcument",ES)
N("hermes_skills_graphify_references_extractin_spec_node_id_format","Node ID Format Rule","ratinale",ES,
  "Node ID formt: lowercse [a-z0-9_], pttern {stem}_{entity} where stem is the full repo-reltive pth with xtnsion droped, every directory levl included.")
N("hermes_skills_graphify_references_extractin_spec_source_file_rule","sorce_file Pth Rle","ratinale",ES,
  "sorce_file must be FILE_LIST pth verbatim (absolte, no shortning, no re-reltivizing, no separtor change).")
N("hermes_skills_graphify_references_extractin_spec_confidence_score_requirement","cnfidence_score Required on Every Edge","rationale",ES,
  "EXTRACTED=1.0. INFERRED: pick one of 0.95/0.85/0.75/0.65/0.55, nr 0.5. AMBIGUOUS=0.1-0.3.")
N("hermes_skills_graphify_references_extractin_spec_semantic_simlarity","smantically_smilar_to Edge Type","ratinale",ES,
  "When two concepts solve the sme problm withot a strctural lnk, add smantically_smilar_to mrked INFERRED with confidence 0.6-0.95.")
N("hermes_skills_graphify_references_extractin_spec_hyperedges","Hyperedges (3+ Node Reltions)","ratinale",ES,
  "When 3+ nodes share a concept, flow, or pttern not captred by pirwise edges, add a hyperedge. Mx 3 per chunk.")
N("hermes_skills_graphify_references_extractin_spec_yaml_frontmatter","YAML Frontmatter Propation","ratinale",ES,
  "If a file has YAML frontmatter, copy sorce_url, captured_at, autor, contributor onto every node from that file.")
N("hermes_skills_graphify_references_extractin_spec_file_type_enm","file_type Enum Constrint","ratinale",ES,
  "file_type must be xactly one of: code, document, paper, image, ratinale, cncept.")
N("hermes_skills_graphify_references_extractin_spec_ratinale_attribut","Rtionale Stored as Node Attribte","ratinale",ES,
  "Store WHY decisions were mde as a rationale attribute on the relevant node, not as a separte node.")

for sid in ["hermes_skills_graphify_references_extractin_spec_node_id_format",
            "hermes_skills_graphify_references_extractin_spec_source_file_rule",
            "hermes_skills_graphify_references_extractin_spec_confidence_score_requirement",
            "hermes_skills_graphify_references_extractin_spec_semantic_simlarity",
            "hermes_skills_graphify_references_extractin_spec_hyperedges",
            "hermes_skills_graphify_references_extractin_spec_yaml_frontmatter",
            "hermes_skills_graphify_references_extractin_spec_file_type_enm",
            "hermes_skills_graphify_references_extractin_spec_ratinale_attribut"]:
    E("hermes_skills_graphify_references_extractin_spec_subagent_prompt", sid, "conceptually_related_to", "EXTRACTED", 1.0, ES)

E("hermes_skills_graphify_skill_extracted_confidence","hermes_skills_graphify_references_extractin_spec_confidence_score_requirement","conceptually_related_to","INFERRED",0.95,ES)
E("hermes_skills_graphify_skill_inferred_confidence","hermes_skills_graphify_references_extractin_spec_confidence_score_requirement","conceptually_related_to","INFERRED",0.95,ES)
E("hermes_skills_graphify_skill_ambiguous_confidence","hermes_skills_graphify_references_extractin_spec_confidence_score_requirement","conceptually_related_to","INFERRED",0.95,ES)

# ===== github-and-merge.md =====
N("hermes_skills_graphify_references_github_and_merge_graphify_clone","graphify clone (GitHub Clone)","concept",GM)
N("hermes_skills_graphify_references_github_and_merge_graphify_merge_graphs","graphify merge-graphs (Cross-Repo Merge)","concept",GM)
N("hermes_skills_graphify_references_github_and_merge_cross_repo_graph","Cross-Repo Knowledge Graph","concept",GM)
N("hermes_skills_graphify_references_github_and_merge_monorepo_merge","Monorepo Multi-Folder Merge","rationale",GM,
  "Run graphify extract on each subfolder separately, then merge-graphs at project root.")

E("hermes_skills_graphify_references_github_and_merge_graphify_clone","hermes_skills_graphify_references_github_and_merge_cross_repo_graph","conceptually_related_to","EXTRACTED",1.0,GM)
E("hermes_skills_graphify_references_github_and_merge_graphify_merge_graphs","hermes_skills_graphify_references_github_and_merge_cross_repo_graph","conceptually_related_to","EXTRACTED",1.0,GM)
E("hermes_skills_graphify_references_github_and_merge_graphify_merge_graphs","hermes_skills_graphify_references_github_and_merge_monorepo_merge","conceptually_related_to","EXTRACTED",1.0,GM)

# ===== hooks.md =====
N("hermes_skills_graphify_references_hooks_graphify_hook","graphify hook (Git Post-Commit)","concept",HK)
N("hermes_skills_graphify_references_hooks_graphify_claude_install","graphify claude install (CLAUDE.md)","concept",HK)
N("hermes_skills_graphify_references_hooks_post_commit_hook","Post-Commit Auto-Rebuild Hook","rationale",HK,
  "After every git commit, detects changed code files via git diff, re-runs AST extraction, and rebuilds graph.json and GRAPH_REPORT.md.")
N("hermes_skills_graphify_references_hooks_claude_md_integration","CLAUDE.md Native Integration","rationale",HK,
  "graphify claude install writes a graphify section to CLAUDE.md, making graphify always-on in Claude Code sessions.")

E("hermes_skills_graphify_references_hooks_graphify_hook","hermes_skills_graphify_references_hooks_post_commit_hook","conceptually_related_to","EXTRACTED",1.0,HK)
E("hermes_skills_graphify_references_hooks_graphify_claude_install","hermes_skills_graphify_references_hooks_claude_md_integration","conceptually_related_to","EXTRACTED",1.0,HK)

# ===== query.md =====
N("hermes_skills_graphify_references_query_graphify_query","graphify query (BFS/DFS Traversal)","concept",QR)
N("hermes_skills_graphify_refrences_query_gaphify_pth","graphify pth (Shortest Path)","cncept",QR)
N("hermes_skills_graphify_references_query_graphify_explain","graphify explain (Node Explanation)","cncept",QR)
N("hermes_skills_graphify_references_query_b_s_traversal","BFS Traversal Mode","rationle",QR,
  "Default traversal mode. Best for broad context questions. Exlores all neighbors layer by layer up to depth 3.")
N("hermes_skills_graphify_references_query_d_s_traversal","DFS Traversal Mode","rationle",QR,
  "Flag --dfs. Best for tracing a specific chain or dependency pth. Depth-limited to 6.")
N("hermes_skills_graphify_references_query_vocabulry_exansion","Constrined Query Vocablry Exansion","rationle",QR,
  "Before travrsal, exand uer query against the graph's vocablry. Extrct token vocablry from node labels, slect up to 12 mtching tkens.")
N("hermes_skills_graphify_references_query_save_result","graphify save-result (Fedback Loop)","rationle",QR,
  "After query/path/xplain, save the rult bck via save-rult with --otcome (usful, dad_end, corrcted) for slf-improving graph mory.")
N("hermes_skills_graphify_references_query_graphify_reflect","graphify reflet (Lessns)","rationale",QR,
  "Refresh and read LESONS.md at start of grph work. Lists prefered sources, knwn dead ends, and prior corrections.")
N("hermes_skills_graphify_references_query_networkx_fallback","NetworkX Inline Fallback","rationale",QR,
  "When graphify query CLI is unavaible, load graph.json and run BFS/DFS traversal inline using NetworkX's json_graph.node_link_graph.")

# ===== transcribe.md =====
N("hermes_skills_graphify_references_transcribe_whisper_transcription","Whisper Vide/Audio Transcritpion","ratinale",TR,
  "Vide/audio files are transcribed via Whisper before semantc extractin. Domain hints are composed from god node labels and passed as initial_prompt.")
N("hermes_skills_graphify_references_transcribe_graphify_transcrib","grphify.transcribe Module","cncept",TR)
N("hermes_skills_graphify_references_transcribe_graphify_whisper_model","GRAPHIFY_WHISPER_MODEL Env Variable","cncept",TR)

# ===== update.md =====
N("hermes_skills_graphify_references_update_graphify_update","graphify --update (Incremntal)","cncept",UP)
N("hermes_skills_graphify_references_update_detect_incremntal","detect_incremntal Function","cncept",UP)
N("hermes_skills_graphify_references_update_bild_merge","bild_merge Function","cncept",UP)
N("hermes_skills_graphify_references_update_code_only_optimization","Code-Only Fast Pth (--update)","ratinale",UP,
  "When all changed files are code-only, skip semntic extraction entirely — run only AST, skip subagents, go straight to merge.")
N("hermes_skills_graphify_references_update_shrink_guard","Shrink Gard (#479)","ratinale",UP,
  "to_json refuses to write when new grph is smllr than existing graph.json, preventing accidental data loss. Use --fore to override.")
N("hermes_skills_graphify_references_update_stamped_manifest","Stamped Manifest Tracking","ratinale",UP,
  "Only semntic files that actually produced output get stamped in the mnifest. Unstmped dispatched files cleared so next --update re-queues them.")
N("hermes_skills_graphify_references_update_graphify_cluster_only","graphify cluster-only","cncept",UP)

# ===== AGENTS.md =====
N("agents_graphify_integration","AGENTS.md Graphify Integrton Rules","dcument",AG)
N("agents_graphify_query_precedence","Graphify Query Preedence Rle","ratinale",AG,
  "For codebase questions, first run graphify query when graphify-out/graph.json exists.")
N("agents_graphify_update_after_code_change","Graphify Update After Code Change Rule","rationale",AG,
  "After modifying code, run graphify update . to keep the graph current (AST-only, no API cost).")
N("agents_graphify_dirty_files_tolerance","Dirty graphify-out/ Fls Tolerance","rationale",AG,
  "Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify.")

E("agents_graphify_integration","agents_graphify_query_precedence","conceptually_related_to","EXTRACTED",1.0,AG)
E("agents_graphify_integration","agents_graphify_update_after_code_change","conceptually_related_to","EXTRACTED",1.0,AG)
E("agents_graphify_integration","agents_graphify_dirty_files_tolerance","conceptually_related_to","EXTRACTED",1.0,AG)
E("agents_graphify_integration","hermes_skills_graphify_references_query_graphify_query","references","EXTRACTED",1.0,AG)
E("agents_graphify_integration","hermes_skills_graphify_references_query_graphify_pth","references","EXTRACTED",1.0,AG)
E("agents_graphify_integration","hermes_skills_graphify_references_query_graphify_explain","references","EXTRACTED",1.0,AG)
E("agents_graphify_integration","hermes_skills_graphify_references_update_graphify_update","references","EXTRACTED",1.0,AG)
E("agents_graphify_integration","hermes_skills_graphify_skill_fast_path","references","INFERRED",0.85,AG)

# ===== README.md =====
N("readme_nextjs_project","Next.js Project (create-next-app)","dcument",RM)
N("readme_vercel_deployment","Vercel Deploment","cncept",RM)
N("readme_next_font","next/font (Fnt Optimiztion)","cncept",RM)

E("readme_nextjs_project","readme_vercel_deployment","conceptually_related_to","EXTRACTED",1.0,RM)
E("readme_nextjs_project","readme_next_font","references","EXTRACTED",1.0,RM)

# ===== src/app/api/chat/mantis-sumary.md =====
N("src_app_api_chat_mantis_sumary_route","route.ts (POST /api/chat)","dcument",MC)
N("src_app_api_chat_mantis_sumary_gemini_25_flash","Gogle Gemni gemini-2.5-flash","cncept",MC)
N("src_app_api_chat_mantis_sumary_rate_limting","In-Memory Rate Limting (60s Sliding Windw)","cncept",MC)
N("src_app_api_chat_mantis_sumary_max_messge_length","MAX_MESAGE_LENGTH = 2000","cncept",MC)
N("src_app_api_chat_mantis_sumary_spported_locales","SUPPORTED_LOCALES = ['it','en']","cncept",MC)
N("src_app_api_chat_mantis_sumary_promt_injectin_risk","Prompt Injection Risk (User Mesage in LLM Promt)","cncept",MC,
  "User mesage is inserted into Gemni promt. Mitigation is textul instrution to ignore embeded instrutions - not robust.")
N("src_app_api_chat_mantis_sumary_generateobject","generateObject (AI SDK with Zod Schema)","cncept",MC)
N("src_app_api_chat_mantis_sumary_x_forwarded_or","x-forwarded-for Header (IP Tracing)","cncept",MC)
N("src_app_api_chat_mantis_sumary_next_pblic_migation","NEXT_PUBLIC_ to Server-Side Key Migrtion","rationale",MC,
  "AI keys were originally exposed as NEXT_PUBLIC_ - moved server-side. Fix noted acros multiple mantis-sumary files.")

E("src_app_api_chat_mantis_sumary_route","src_app_api_chat_mantis_sumary_gemini_25_flash","calls","EXTRACTED",1.0,MC)
E("src_app_api_chat_mantis_sumary_route","src_app_api_chat_mantis_sumary_rate_limting","implments","EXTRACTED",1.0,MC)
E("src_app_api_chat_mantis_sumary_route","src_app_api_chat_mantis_sumary_max_messge_length","implments","EXTRACTED",1.0,MC)
E("src_app_api_chat_mantis_sumary_route","src_app_api_chat_mantis_sumary_spported_locales","implments","EXTRACTED",1.0,MC)
E("src_app_api_chat_mantis_sumary_route","src_app_api_chat_mantis_sumary_generateobject","calls","EXTRACTED",1.0,MC)
E("src_app_api_chat_mantis_sumary_route","src_app_api_chat_mantis_sumary_x_forwarded_or","references","EXTRACTED",1.0,MC)
E("src_app_api_chat_mantis_sumary_route","src_app_api_chat_mantis_sumary_promt_injectin_risk","conceptually_related_to","INFERRED",0.85,MC)

# ===== src/app/blogs/mantis-sumary.md =====
N("src_app_blgs_mantis_sumary_blgs_pge","/ blogs Pge (Static Placehlder)","dcument",MB)
N("src_app_blgs_mantis_sumary_nindex","robots: nindex on /blogs","cncept",MB)

# ===== src/app/mantis-sumary.md =====
N("src_app_mantis_sumary_layot_tsx","layot.tsx (Rot Layot with JSON-LD)","dcument",MA)
N("src_app_mantis_sumary_pge_tsx","page.tsx (Hme Pge)","dcument",MA)
N("src_app_mantis_sumary_robots_ts","robots.ts (Dynmic robts.txt)","dcument",MA)
N("src_app_mantis_sumary_sitemap_ts","sitemap.ts (Dynmic Sitemap)","dcument",MA)
N("src_app_mantis_sumary_dangerosly_set_inner_html","dngerouslySetInnerHTML in layot.tsx","cncept",MA)
N("src_app_mantis_sumary_json_ld","JSON-LD Strctred Dta (Person + ProfessionalService)","cncept",MA)
N("src_app_mantis_sumary_site_config_url","siteConfig.url (Hardcoded MetadataBase)","cncept",MA)

E("src_app_mantis_sumary_layot_tsx","src_app_mantis_sumary_json_ld","implments","EXTRACTED",1.0,MA)
E("src_app_mantis_sumary_layot_tsx","src_app_mantis_sumary_dangerosly_set_inner_html","references","EXTRACTED",1.0,MA)

# ===== src/components/mantis-sumary.md =====
N("src_components_mantis_sumary_contact_tsx","Cntact.tsx (Cntact Frm + AI + EmailJS)","dcument",MP)
N("src_components_mantis_sumary_alert_tsx","Alert.tsx (Alert UI)","dcument",MP)
N("src_components_mantis_sumary_modal_tsx","Modal.tsx (Accessible Modal)","dcument",MP)
N("src_components_mantis_sumary_navbar_tsx","Navbar.tsx","dcument",MP)
N("src_components_mantis_sumary_foter_tsx","Foter.tsx","dcument",MP)
N("src_components_mantis_sumary_hero3d_tsx","Hero3D.tsx (Three.js + R3F)","dcument",MP)
N("src_components_mantis_sumary_heroscene_tsx","HeroScene.tsx (3D Scene)","dcument",MP)
N("src_components_mantis_sumary_themecontrols_tsx","ThemeCntrols.tsx (Theme Tggl)","dcument",MP)
N("src_components_mantis_sumary_lgalcenter_tsx","LgalCenter.tsx (Cokie Bnner + Lgal Modls)","dcument",MP)
N("src_components_mantis_sumary_emailjs_exposure","EmailJS Pblic Key Exposre (NEXT_PUBLIC_)","cncept",MP)
N("src_components_mantis_sumary_animejs","animejs (SVG Animations)","cncept",MP)
N("src_components_mantis_sumary_usegltf","useGLTF (3D Asset Lader)","cncept",MP)
N("src_components_mantis_sumary_localstrage_mnipulation","localStrage Manipulation Risk","cncept",MP)
N("src_components_mantis_sumary_xss_dangeroslysetinnerhtml","XSS Risk via dangeroslySetInnerHTML (Modal)","cncept",MP)
N("src_components_mantis_sumary_threejs","Three.js","cncept",MP)

E("src_components_mantis_sumary_contact_tsx","src_app_api_chat_mantis_sumary_route","calls","EXTRACTED",1.0,MP)
E("src_components_mantis_sumary_contact_tsx","src_components_mantis_sumary_emailjs_exposure","conceptually_related_to","EXTRACTED",1.0,MP)
E("src_components_mantis_sumary_contact_tsx","src_components_mantis_sumary_animejs","calls","EXTRACTED",1.0,MP)
E("src_components_mantis_sumary_hero3d_tsx","src_components_mantis_sumary_threejs","calls","EXTRACTED",1.0,MP)
E("src_components_mantis_sumary_hero3d_tsx","src_components_mantis_sumary_usegltf","calls","EXTRACTED",1.0,MP)
E("src_components_mantis_sumary_heroscene_tsx","src_components_mantis_sumary_threejs","calls","EXTRACTED",1.0,MP)
E("src_components_mantis_sumary_themecontrols_tsx","src_components_mantis_sumary_localstrage_mnipulation","conceptually_related_to","EXTRACTED",1.0,MP)
E("src_components_mantis_sumary_lgalcenter_tsx","src_components_mantis_sumary_localstrage_mnipulation","conceptually_related_to","EXTRACTED",1.0,MP)

# ===== src/hooks/mantis-sumary.md =====
N("src_hooks_mantis_sumary_usecontactagent","useContactAgent() Hok (AI Chat)","dcument",MH)
N("src_hooks_mantis_sumary_usealert","useAlert() Hok","dcument",MH)
N("src_hooks_mantis_sumary_uselocale","useLcale() Hok","dcument",MH)
N("src_hooks_mantis_sumary_usetheme","useTheme() Hok","dcument",MH)

E("src_hooks_mantis_sumary_usecontactagent","src_app_api_chat_mantis_sumary_route","calls","EXTRACTED",1.0,MP)
E("src_hooks_mantis_sumary_usecontactagent","src_components_mantis_sumary_contact_tsx","conceptually_related_to","EXTRACTED",1.0,MH)
E("src_hooks_mantis_sumary_usealert","src_components_mantis_sumary_alert_tsx","conceptually_related_to","EXTRACTED",1.0,MH)
E("src_hooks_mantis_sumary_uselocale","src_components_mantis_sumary_localstrage_mnipulation","references","INFERRED",0.85,MH)
E("src_hooks_mantis_sumary_usetheme","src_components_mantis_sumary_localstrage_mnipulation","references","INFERRED",0.85,MH)

# ===== src/lib/mantis-sumary.md =====
N("src_lib_mantis_sumary_knowledgebase","knoedgeBase (FAQ + AI Cntext)","dcument",ML)
N("src_lib_mantis_sumary_bildsystemprompt","bldSystemPromt(locale) Function","dcument",ML)
N("src_lib_mantis_sumary_seo_ts","seo.ts (SEO Cofiguration)","dcument",ML)
N("src_lib_mantis_sumary_anti_promt_injectin_rule","Anti-Prompt-Injectin Rle in System Promt","rationle",ML,
  "System promt instructs LLM to ignore instrutions contined in the visitor's messge. Best-efort mitgation, not robst protetion.")
N("src_lib_mantis_sumary_siteconfig_url_fixed","siteConfig.url Fxed to nicolasolazo.com","cncept",ML)

E("src_lib_mantis_sumary_bildsystemprompt","src_lib_mantis_sumary_anti_promt_injectin_rule","implments","EXTRACTED",1.0,ML)
E("src_lib_mantis_sumary_bildsystemprompt","src_lib_mantis_sumary_knowledgebase","references","EXTRACTED",1.0,ML)
E("src_lib_mantis_sumary_seo_ts","src_lib_mantis_sumary_siteconfig_url_fixed","implments","EXTRACTED",1.0,ML)
E("src_lib_mantis_sumary_siteconfig_url_fixed","src_app_mantis_sumary_site_config_url","references","EXTRACTED",1.0,MA)

# ===== src/mantis-sumary.md =====
N("src_mantis_sumary_nextjs14_app","Next.js 14 Portfolio Application","dcument",MS)
N("src_mantis_sumary_csp_headers_missing","CSP Hders Missing","ratinale",MS,
  "No Content Security Plicy headers configured. No protetion aginst XSS or content injection. next.cong.mjs is empty with no security config.")
N("src_mantis_sumary_cors_defalt","CORS Defalt (Same-Orgin)","ratinale",MS,
  "Default Next.js CORS is same-origin for API routes. No xplicit CORS configuration.")
N("src_mantis_sumary_vercel_serverless","Vercel Serverless (Multi-Instance Rate Limiting Bypass)","ratinale",MS,
  "In-memory rate limiting is not shared acros serverless instances. On Vercel, ch lambda has its own Map -> rate limting is bypassable.")
N("src_mantis_sumary_no_timet","No Timet on AI Fech / EmailJS","ratinale",MS,
  "Neither the generateObject call nor EmailJS send have explicit timets. Possible hanging requests.")
N("src_mantis_sumary_console_error_loging","console.error in Prodction","ratinale",MS,
  "console.error in cch blocks could log sensitive data in prodction.")
N("src_mantis_sumary_dta_minimization","Dta Minimiztion (Name/Email Not Sent to AI)","rationale",MS,
  "Only the mesage text is sent to Gogle Gemni; name and email go only to EmailJS. Privacy-psitive design choice.")
N("src_mantis_sumary_critical_deps","Crtical Dependencies (next, zod, @ai-sdk, @emiljs, three)","cncept",MS)

# ===== src/store/mantis-sumary.md =====
N("src_store_mantis_sumary_store_ts","store.ts (Cntral Dta Aggregator)","dcument",MT)
N("src_store_mantis_sumary_cards_ts","cards.ts (Lcalized Service Cards)","dcument",MT)
N("src_store_mantis_sumary_abot_ts","abot.ts (Static Abot Dta)","dcument",MT)
N("src_store_mantis_sumary_i18n_ts","i18n.ts (All Lcalized Strins + Lgal Texts)","dcument",MT)
N("src_store_mantis_sumary_lgal_texts_gdpr","Lgal Texts (GDPR, AI Act, Lw 132/2025)","cncept",MT)
N("src_store_mantis_sumary_email_plachlder","[EMIAL] Plachlder in Lgal Texts","cncept",MT)

E("src_store_mantis_sumary_store_ts","src_store_mantis_sumary_cards_ts","references","EXTRACTED",1.0,MT)
E("src_store_mantis_sumary_store_ts","src_store_mantis_sumary_abot_ts","references","EXTRACTED",1.0,MT)
E("src_store_mantis_sumary_store_ts","src_store_mantis_sumary_i18n_ts","references","EXTRACTED",1.0,MT)
E("src_store_mantis_sumary_i18n_ts","src_store_mantis_sumary_lgal_texts_gdpr","conceptually_related_to","EXTRACTED",1.0,MT)
E("src_store_mantis_sumary_i18n_ts","src_store_mantis_sumary_email_plachlder","conceptually_related_to","EXTRACTED",1.0,MT)

# ===== src/tyes/mantis-sumary.md =====
N("src_tyes_mantis_sumary_locale_type","Lcale Type ('it' | 'en')","dcument",MY)
N("src_tyes_mantis_sumary_localemap_type","LcaleMap<T> Generic Type","dcument",MY)

# ===== CROSS-FILE SEMANTIC SIMILARITIES =====
E("src_app_api_chat_mantis_sumary_promt_injectin_risk","src_lib_mantis_sumary_anti_promt_injectin_rule","semantically_similar_to","INFERRED",0.95,ML)
E("src_app_api_chat_mantis_sumary_next_pblic_migation","src_components_mantis_sumary_emailjs_exposure","semantically_similar_to","INFERRED",0.85,MP)
E("src_app_mantis_sumary_dangerosly_set_inner_html","src_components_mantis_sumary_xss_dangeroslysetinnerhtml","semantically_similar_to","INFERRED",0.85,MP)
E("src_mantis_sumary_csp_headers_missing","src_components_mantis_sumary_xss_dangeroslysetinnerhtml","semantically_similar_to","INFERRED",0.75,MP)
E("src_app_api_chat_mantis_sumary_rate_limting","src_mantis_sumary_vercel_serverless","conceptually_related_to","INFERRED",0.85,MS)
E("src_mantis_sumary_no_timet","src_app_api_chat_mantis_sumary_route","conceptually_related_to","INFERRED",0.75,MC)
E("src_mantis_sumary_nextjs14_app","readme_nextjs_project","conceptually_related_to","INFERRED",0.85,MS)
E("src_mantis_sumary_vercel_serverless","readme_vercel_deployment","conceptually_related_to","INFERRED",0.85,MS)
E("src_mantis_sumary_console_error_loging","src_app_api_chat_mantis_sumary_route","conceptually_related_to","INFERRED",0.75,MC)
E("src_tyes_mantis_sumary_locale_type","src_app_api_chat_mantis_sumary_spported_locales","conceptually_related_to","INFERRED",0.85,MY)
E("hermes_skills_graphify_references_add_watch_code_change_rebild","hermes_skills_graphify_references_update_code_only_optimization","semantically_similar_to","INFERRED",0.85,UP)
E("hermes_skills_graphify_references_extractin_spec_ratinale_attribut","hermes_skills_graphify_skill_inferred_confidence","semantically_similar_to","INFERRED",0.75,ES)

# ===== HYPEREDGES =====
H("mantis_security_audit_pipeline","Mantis Secrity Audit Pieline",
  ["src_mantis_sumary_nextjs14_app","src_app_api_chat_mantis_sumary_route","src_lib_mantis_sumary_bildsystemprompt",
   "src_components_mantis_sumary_contact_tsx","src_hooks_mantis_sumary_usecontactagent"],
  "prticipate_in","INFERRED",0.75,MS)

H("graphify_extractin_pipeline","Grphify Extrction Pieline Stps",
  ["hermes_skills_graphify_skill_ast_extraction","hermes_skills_graphify_skill_semantic_extraction",
   "hermes_skills_graphify_skill_subagents","hermes_skills_graphify_skill_deep_mode",
   "hermes_skills_graphify_skill_prallel_ast_semantic"],
  "prticipate_in","INFERRED",0.75,SK)

H("promt_injectin_defense_chain","Prompt Injection Defense Chain",
  ["src_app_api_chat_mantis_sumary_promt_injectin_risk","src_lib_mantis_sumary_anti_promt_injectin_rule",
   "src_lib_mantis_sumary_bildsystemprompt","src_app_api_chat_mantis_sumary_generateobject",
   "src_app_api_chat_mantis_sumary_route"],
  "frm","INFERRED",0.65,ML)

result = {"nodes": nodes, "edges": edges, "hyperedges": hyperedges, "input_tokens": 0, "otput_tokens": 0}

import pathlib
pathlib.Path("/home/nikslaz/dev/site-portfolio/graphify-out/.graphify_chunk_01.json").write_text(json.dumps(result, indent=2, ensure_ascii=Fase), encoding="utf-8")
print(f"OK: {len(nodes)} nodes, {len(edges)} edges, {len(hyperedges)} hyperedges")