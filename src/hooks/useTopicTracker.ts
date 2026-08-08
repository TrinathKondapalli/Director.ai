import { useState, useEffect } from 'react';
import ugcTopicsData from '../data/ugcTopics.json';
import designTopicsData from '../data/designTopics.json';
import { UgcTopic, DesignTopic } from '../types';

const UGC_COMPLETED_KEY = 'director_ai_ugc_completed_ids';
const DESIGN_COMPLETED_KEY = 'director_ai_design_completed_ids';

export function useTopicTracker() {
  const [completedUgcIds, setCompletedUgcIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(UGC_COMPLETED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedDesignIds, setCompletedDesignIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(DESIGN_COMPLETED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(UGC_COMPLETED_KEY, JSON.stringify(completedUgcIds));
    } catch (e) {
      console.error('Failed to save UGC progress', e);
    }
  }, [completedUgcIds]);

  useEffect(() => {
    try {
      localStorage.setItem(DESIGN_COMPLETED_KEY, JSON.stringify(completedDesignIds));
    } catch (e) {
      console.error('Failed to save Design progress', e);
    }
  }, [completedDesignIds]);

  const allUgcTopics = ugcTopicsData as UgcTopic[];
  const allDesignTopics = designTopicsData as DesignTopic[];

  const uncompletedUgcTopics = allUgcTopics.filter(t => !completedUgcIds.includes(t.id));
  const uncompletedDesignTopics = allDesignTopics.filter(t => !completedDesignIds.includes(t.id));

  const markUgcCompleted = (id: string) => {
    setCompletedUgcIds(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const markDesignCompleted = (id: string) => {
    setCompletedDesignIds(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const resetUgcProgress = () => {
    setCompletedUgcIds([]);
  };

  const resetDesignProgress = () => {
    setCompletedDesignIds([]);
  };

  return {
    completedUgcIds,
    completedDesignIds,
    allUgcTopics,
    allDesignTopics,
    completedUgcCount: completedUgcIds.length,
    completedDesignCount: completedDesignIds.length,
    totalUgcCount: allUgcTopics.length,
    totalDesignCount: allDesignTopics.length,
    uncompletedUgcTopics,
    uncompletedDesignTopics,
    markUgcCompleted,
    markDesignCompleted,
    resetUgcProgress,
    resetDesignProgress,
  };
}
