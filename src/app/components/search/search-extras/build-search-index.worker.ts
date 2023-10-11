/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const menuItems: any[] = data;
  const index: any[] = [];
  const recurser = (subMenuItems: any[], parent?: any) => {
    if (!subMenuItems) return;
    for (const menuItem of subMenuItems) {
      if (!menuItem || menuItem.isDivider || !menuItem.label) continue;
      else {
        if (parent) {
          menuItem.breadcrumbs = [...(parent.breadcrumbs || [])];
          menuItem.breadcrumbs.push({
            key: parent.label,
            value: parent.link,
          });
        }
        menuItem.labelLowerCase = menuItem.label.toLowerCase();
        menuItem.system = menuItem.system || parent?.system;
        menuItem.systemIcon =
          menuItem.systemIcon || parent?.systemIcon || menuItem.icon;
        if (menuItem.hasSub) recurser(menuItem.subs, menuItem);
        else if (!menuItem.link?.trim()) continue;
        else {
          menuItem.breadcrumbsStr = (
            menuItem.breadcrumbs?.map((x) => x.key)?.join(' ') || ''
          ).toLowerCase();
          index.push(menuItem);
        }
      }
    }
  };
  recurser(menuItems);
  // console.table(index);
  index.sort((x, y) => x.label.localeCompare(y.label));
  postMessage(index);
});
