* IntersectionObserver    isIntersecting
* ref 获取 container
* elementObserver.current.observe(node);




```
  function lazyLoadHandler (entries: IntersectionObserverEntry[]) {
        const [entry] = entries;
        const { isIntersecting } = entry;

        if (isIntersecting) {
            setVisible(true);
            onContentVisible?.();

            const node = containerRef.current;
            if (node && node instanceof HTMLElement) {
                elementObserver.current?.unobserve(node);
            }
        }
    };

  useEffect(() => {
        const options = {
            rootMargin: typeof offset === 'number' ? `${offset}px` : offset || '0px',
            threshold: 0
        };

        elementObserver.current = new IntersectionObserver(lazyLoadHandler, options);

        const node = containerRef.current;

        if (node instanceof HTMLElement) {
            elementObserver.current.observe(node);
        }
        return () => {
            if (node && node instanceof HTMLElement) {
                elementObserver.current?.unobserve(node);
            }
        }
    }, []);


```