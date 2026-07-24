import React, { useState } from 'react';
import { ViewMode, ScreenOption, Hotspot } from './types';
import { SCREENS, HOTSPOTS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BeforePanel } from './components/BeforePanel';
import { AfterPanel } from './components/AfterPanel';
import { HotspotBubble } from './components/HotspotBubble';
import { ConsultModal } from './components/ConsultModal';
import { PdfModal } from './components/PdfModal';
import { UxAuditDrawer } from './components/UxAuditDrawer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenOption>(SCREENS[0]);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers State
  const [isConsultOpen, setIsConsultOpen] = useState<boolean>(false);
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  const [isUxAuditOpen, setIsUxAuditOpen] = useState<boolean>(false);

  // Interactive Slider Position (0% to 100%)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);

  const handleSelectHotspot = (hotspot: Hotspot) => {
    setActiveHotspot(activeHotspot?.id === hotspot.id ? null : hotspot);
  };

  const handleSelectHotspotById = (id: number) => {
    const found = HOTSPOTS.find(h => h.id === id);
    if (found) {
      setActiveHotspot(found);
      if (viewMode === 'before-only') {
        setViewMode('split');
      }
    }
  };

  // Slider Mouse/Touch Handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingSlider) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f7fafb] text-[#181c1d]">
      {/* Top Fixed Header */}
      <Header
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        showHotspots={showHotspots}
        onToggleHotspots={() => setShowHotspots(!showHotspots)}
        onOpenUxAudit={() => setIsUxAuditOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Container Area */}
      <main className="flex-grow flex h-[calc(100vh-7rem)] pt-16 overflow-hidden relative">
        {/* VIEW MODE 1: SPLIT 50/50 */}
        {viewMode === 'split' && (
          <div className="flex w-full h-full overflow-hidden">
            <div className="w-1/2 h-full hidden lg:block">
              <BeforePanel currentScreen={currentScreen} searchQuery={searchQuery} />
            </div>
            <div className="w-full lg:w-1/2 h-full relative">
              <AfterPanel
                currentScreen={currentScreen}
                activeHotspot={activeHotspot}
                onSelectHotspot={handleSelectHotspot}
                showHotspots={showHotspots}
                onOpenConsult={() => setIsConsultOpen(true)}
                onOpenPdf={() => setIsPdfOpen(true)}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        )}

        {/* VIEW MODE 2: INTERACTIVE SLIDER VIEW */}
        {viewMode === 'slider' && (
          <div
            className="relative w-full h-full overflow-hidden select-none cursor-col-resize"
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDraggingSlider(false)}
            onMouseLeave={() => setIsDraggingSlider(false)}
          >
            {/* Right Layer (AFTER - Full Screen) */}
            <div className="absolute inset-0 w-full h-full">
              <AfterPanel
                currentScreen={currentScreen}
                activeHotspot={activeHotspot}
                onSelectHotspot={handleSelectHotspot}
                showHotspots={showHotspots}
                onOpenConsult={() => setIsConsultOpen(true)}
                onOpenPdf={() => setIsPdfOpen(true)}
                searchQuery={searchQuery}
              />
            </div>

            {/* Left Layer (BEFORE - Clipped) */}
            <div
              className="absolute inset-y-0 left-0 h-full overflow-hidden border-r-4 border-[#96c115] z-10 shadow-2xl"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="w-screen h-full">
                <BeforePanel currentScreen={currentScreen} searchQuery={searchQuery} />
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center cursor-ew-resize"
              style={{ left: `calc(${sliderPos}% - 16px)` }}
              onMouseDown={() => setIsDraggingSlider(true)}
            >
              <div className="w-8 h-12 bg-[#4e6700] text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white">
                <span className="material-symbols-outlined text-sm">unfold_more</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 3: BEFORE ONLY */}
        {viewMode === 'before-only' && (
          <div className="w-full h-full">
            <BeforePanel currentScreen={currentScreen} searchQuery={searchQuery} />
          </div>
        )}

        {/* VIEW MODE 4: AFTER ONLY */}
        {viewMode === 'after-only' && (
          <div className="w-full h-full relative">
            <AfterPanel
              currentScreen={currentScreen}
              activeHotspot={activeHotspot}
              onSelectHotspot={handleSelectHotspot}
              showHotspots={showHotspots}
              onOpenConsult={() => setIsConsultOpen(true)}
              onOpenPdf={() => setIsPdfOpen(true)}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {/* Active Hotspot Bubble Floating Overlay */}
        {showHotspots && activeHotspot && viewMode !== 'before-only' && (
          <div className="absolute inset-0 pointer-events-none z-40">
            <div className="relative w-full h-full max-w-7xl mx-auto pointer-events-auto">
              <HotspotBubble
                hotspot={activeHotspot}
                onClose={() => setActiveHotspot(null)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Bottom Fixed Footer Instruction Bar */}
      <Footer
        activeHotspot={activeHotspot}
        onClearActiveHotspot={() => setActiveHotspot(null)}
        onOpenUxAudit={() => setIsUxAuditOpen(true)}
        hotspotsCount={HOTSPOTS.length}
      />

      {/* Interactive Modals & Drawers */}
      <ConsultModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />

      <PdfModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        currentScreen={currentScreen}
      />

      <UxAuditDrawer
        isOpen={isUxAuditOpen}
        onClose={() => setIsUxAuditOpen(false)}
        onSelectHotspot={handleSelectHotspotById}
      />
    </div>
  );
}
