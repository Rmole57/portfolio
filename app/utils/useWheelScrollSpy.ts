import { useState, useEffect, useRef, useCallback } from 'react';
import { useThrottledOnWheelScroll } from './useThrottledOnWheelScroll';
import { NavItem } from '../components/HeaderNav';

const useWheelScrollSpy = ({ items = [] } = {}) => {
  const itemsWithNodeRef = useRef<
    { hash?: string; node: HTMLElement | null }[]
  >([]);
  useEffect(() => {
    itemsWithNodeRef.current = getItemsClient(items);
  }, [items]);

  const [activeState, setActiveState] = useState<string | null>(null);

  const findActiveIndex = useCallback(() => {
    let active: { hash?: string | null } | undefined;
    for (let i = itemsWithNodeRef.current.length - 1; i >= 0; i -= 1) {
      if (document.documentElement.scrollTop < 200) {
        active = { hash: null };
        break;
      }

      const item = itemsWithNodeRef.current[i];

      if (process.env.NODE_ENV !== 'production') {
        if (!item.node) {
          console.error(
            `Missing node on the item ${JSON.stringify(item, null, 2)}`
          );
        }
      }

      if (
        item.node &&
        item.node.offsetTop <
          document.documentElement.scrollTop +
            document.documentElement.clientHeight / 2
      ) {
        active = item;
        break;
      }
    }

    if (active) {
      const next = active.hash ?? null;
      setActiveState((prev) => (prev !== next ? next : prev));
    }
  }, []);

  useThrottledOnWheelScroll(items.length > 0 ? findActiveIndex : null, 100);

  return activeState;
};

const getItemsClient = (items: NavItem[]) =>
  items.map(({ hash }) => ({
    hash,
    node: document.getElementById(hash ?? ''),
  }));

export { useWheelScrollSpy };
