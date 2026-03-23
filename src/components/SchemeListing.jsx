import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Search, Mic, Bookmark, BookmarkPlus, BookOpen, Heart, Home as HomeIcon, Briefcase, Coins, Glasses, Volume2 } from 'lucide-react';
import './SchemeListing.css';
import { getRecommendations } from '../schemesEngine';

const SchemeListing = ({ theme, onBack, onNavigate }) => {
    const isSimplified = theme === 'simplified';

    const [searchQuery, setSearchQuery] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeJurisdiction, setActiveJurisdiction] = useState('All');
    const [sortBy, setSortBy] = useState('match');
    const [schemes, setSchemes] = useState([]);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        document.title = "Search Schemes — Saathi";

        let parsedDisabilities = [];
        try {
            parsedDisabilities = JSON.parse(localStorage.getItem('saathi_disability_type') || '[]');
        } catch (e) { }

        const currentProfile = {
            age: parseInt(localStorage.getItem('saathi_age')) || null,
            income: localStorage.getItem('saathi_income') || null,
            state: localStorage.getItem('saathi_state') || null,
            severity: localStorage.getItem('saathi_disability_severity') || null,
            udid: localStorage.getItem('saathi_has_udid') || null,
            disabilityTypes: parsedDisabilities,
        };

        setProfile(currentProfile);

        const engineMatches = getRecommendations(currentProfile);

        // Append UI properties to items
        const hydratedSchemes = engineMatches.map((scheme, index) => ({
            ...scheme,
            bookmarked: index === 0 || index === 3, // Mock existing bookmarks
            icon: resolveIcon(scheme.tag)
        }));

        setSchemes(hydratedSchemes);
    }, []);

    const resolveIcon = (tag) => {
        switch (tag) {
            case 'Health': return <Heart aria-hidden="true" />;
            case 'Education': return <BookOpen aria-hidden="true" />;
            case 'Housing': return <HomeIcon aria-hidden="true" />;
            case 'Business': return <Briefcase aria-hidden="true" />;
            case 'Transport': return <Briefcase aria-hidden="true" />; // Reuse
            case 'Equipment': return <Glasses aria-hidden="true" />;
            case 'Pension': return <Coins aria-hidden="true" />;
            default: return <BookOpen aria-hidden="true" />;
        }
    }

    // Filters
    const filters = ['All', 'Education', 'Health', 'Housing', 'Business', 'Pension', 'Equipment', 'Transport'];
    const jFilters = ['All', 'Central', 'State'];

    // Voice Search Mock
    const handleMicClick = () => {
        setIsRecording(true);
        setTimeout(() => {
            setSearchQuery('Education schemes for visual impairment');
            setIsRecording(false);
        }, 2500);
    };

    const handleReadAloud = (scheme) => {
        alert(`Read aloud: ${scheme.name}. Benefit: ${scheme.amount}. Match: ${scheme.match} percent.`);
    };

    const toggleBookmark = (id) => {
        setSchemes(prev => prev.map(s => s.id === id ? { ...s, bookmarked: !s.bookmarked } : s));
    };

    // Derived state filtering
    const filteredSchemes = schemes.filter(s => {
        const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || (s.desc && s.desc.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesFilter = activeFilter === 'All' || s.tag === activeFilter;
        const matchesJurisdiction = activeJurisdiction === 'All' || s.category === activeJurisdiction;
        return matchesQuery && matchesFilter && matchesJurisdiction;
    }).sort((a, b) => {
        if (sortBy === 'match') return b.match - a.match;
        if (sortBy === 'alpha') return a.name.localeCompare(b.name);
        return 0;
    });

    return (
        <div className="scheme-page fade-in">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            {/* Header */}
            <header className="scheme-header" role="banner">
                <button className="icon-btn" onClick={onBack} aria-label="Go back to Dashboard"><ArrowLeft size={28} aria-hidden="true" /></button>
                <h1>All Schemes</h1>
                <button className="icon-btn" aria-label="Advanced Filters Menu"><Filter size={28} aria-hidden="true" /></button>
            </header>

            <main id="main-content" role="main" className="scheme-container">
                {/* Search Bar */}
                <div className="search-section">
                    <div className={`search-bar ${isRecording ? 'recording' : ''}`}>
                        <Search className="search-icon" size={20} aria-hidden="true" />
                        <label htmlFor="schemeSearch" className="sr-only">Search schemes</label>
                        <input
                            id="schemeSearch"
                            type="text"
                            placeholder={isRecording ? "Listening..." : "Search schemes..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="mic-btn" onClick={handleMicClick} aria-label="Use voice search">
                            <Mic size={24} className={isRecording ? 'pulse-anim' : ''} aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Sort & Filter Chips */}
                <div className="filter-section" aria-label="Filters and Sorting">
                    <div className="sort-dropdown">
                        <label htmlFor="sort-select" className="sr-only">Sort options</label>
                        <select id="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="match">Sort by Match %</option>
                            <option value="alpha">Sort by Name (A-Z)</option>
                        </select>
                    </div>

                    <div className="chips-container horizontal-scroll" role="group" aria-label="Scheme Categories">
                        {filters.map(f => (
                            <button
                                key={f}
                                className={`chip ${activeFilter === f ? 'active' : ''}`}
                                onClick={() => setActiveFilter(f)}
                                aria-pressed={activeFilter === f}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="chips-container horizontal-scroll" role="group" aria-label="Jurisdiction Filters">
                        {jFilters.map(j => (
                            <button
                                key={j}
                                className={`chip ${activeJurisdiction === j ? 'active' : ''}`}
                                onClick={() => setActiveJurisdiction(j)}
                                aria-pressed={activeJurisdiction === j}
                            >
                                {j === 'All' ? 'All locations' : j}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scheme List */}
                <div className="scheme-list" aria-live="polite">
                    {filteredSchemes.length === 0 ? (
                        <div className="empty-state fade-in" role="status">
                            <div className="empty-icon"><Search size={48} aria-hidden="true" /></div>
                            <h2>No schemes found</h2>
                            <p>Try clearing your filters or using a different search term.</p>
                            <button className="btn btn-outline" onClick={() => { setSearchQuery(''); setActiveFilter('All'); setActiveJurisdiction('All'); }}>Clear Filters</button>
                        </div>
                    ) : (
                        filteredSchemes.map(scheme => (
                            <article
                                key={scheme.id}
                                className="scheme-card fade-in"
                                tabIndex="0"
                                aria-label={`${scheme.name}. Benefit: ${scheme.amount}. Match ${scheme.match} percent. Jurisdiction: ${scheme.category}.`}
                            >
                                {!isSimplified ? (
                                    <>
                                        <div className="s-card-top">
                                            <div className="title-group">
                                                <div className={`cat-icon cat-${scheme.tag ? scheme.tag.toLowerCase().replace(' ', '-') : 'education'}`} aria-hidden="true">
                                                    {scheme.icon}
                                                </div>
                                                <h3>{scheme.name}</h3>
                                            </div>
                                            <button
                                                className="bookmark-btn"
                                                onClick={(e) => { e.stopPropagation(); toggleBookmark(scheme.id); }}
                                                aria-label={scheme.bookmarked ? "Remove Bookmark" : "Add Bookmark"}
                                            >
                                                {scheme.bookmarked ? <Bookmark size={24} className="bookmarked" aria-hidden="true" /> : <BookmarkPlus size={24} aria-hidden="true" />}
                                            </button>
                                        </div>

                                        <div className="s-card-details">
                                            <p className="s-benefit"><strong>Benefit:</strong> {scheme.amount}</p>
                                            <span className="s-match-badge">{scheme.match}% match</span>
                                        </div>

                                        <p className="s-tags">{scheme.category} • {scheme.tag} • Age {scheme.minAge}-{scheme.maxAge} • {scheme.requiresUDID ? 'UDID Required' : 'No UDID Needed'}</p>

                                        <div className="s-card-actions">
                                            <button className="btn btn-outline s-view-btn" onClick={(e) => { e.stopPropagation(); onNavigate('scheme_detail'); }}>View details</button>
                                            <button className="read-aloud-btn inline" aria-label={`Read aloud ${scheme.name}`} onClick={(e) => { e.stopPropagation(); handleReadAloud(scheme); }}>
                                                <Volume2 size={24} aria-hidden="true" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    // Simplified Mode Rendering
                                    <div className="s-card-simplified">
                                        <h3>{scheme.name}</h3>
                                        <p className="s-benefit-large">{scheme.amount}</p>
                                        <div className="simplified-actions">
                                            <button className="btn btn-primary large-action" onClick={(e) => { e.stopPropagation(); onNavigate('scheme_detail'); }}>Learn more</button>
                                            <button className="read-aloud-btn" aria-label={`Read aloud ${scheme.name}`} onClick={(e) => { e.stopPropagation(); handleReadAloud(scheme); }}>
                                                <Volume2 size={32} aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </article>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default SchemeListing;
