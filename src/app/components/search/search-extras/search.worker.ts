/// <reference lib="webworker" />


addEventListener('message', ({ data }) => {
  const parseQuery1 = (query: string) => {
    return query?.split(' ')?.filter((q) => q);
  };

  const searchPages = async (queries: string[]) => {
    const res: any[] = [];
    for (const query of queries) {
      res.push(
        ...(menuIndex?.filter((x) => x.breadcrumbsStr.startsWith(query)) || [])
      );
    }
    for (const query of queries) {
      res.push(
        ...(menuIndex?.filter((x) => x.breadcrumbsStr.includes(query)) || [])
      );
    }
    for (const query of queries) {
      res.push(
        ...(menuIndex?.filter((x) => x.labelLowerCase.startsWith(query)) || [])
      );
    }
    for (const query of queries) {
      res.push(
        ...(menuIndex?.filter((x) => x.labelLowerCase.includes(query)) || [])
      );
    }
    return [...new Set(res)];
  };

  const searchHelp = async (queries: string[]) => {
    return [];
  };

  const query: string = data.query?.toLowerCase()?.trim();
  const menuIndex: any[] = data.menuIndex;
  if (!query) postMessage(null);
  const queries = parseQuery1(query);
  if (queries.length > 1) queries.unshift(query);
  // console.log('queries', queries);

  Promise.all([searchPages(queries), searchHelp(queries)]).then((r) =>
    postMessage(r)
  );
});
