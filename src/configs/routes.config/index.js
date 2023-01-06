import React from "react";
import authRoute from "./authRoute";
import { DOCS_PREFIX_PATH } from "constants/route.constant";

export const publicRoutes = [...authRoute];

export const protectedRoutes = [
  {
    key: "home",
    path: "/home",
    component: React.lazy(() => import("views/Home")),
    authority: [],
  },
  /** Example purpose only */
  {
    key: "singleMenuItem",
    path: "/whitelist-blacklist",
    component: React.lazy(() => import("views/demo/SingleMenuView")),
    authority: [],
  },
  {
    key: "collapseMenu.item1",
    path: "/erc20",
    component: React.lazy(() => import("views/demo/Erc20")),
    authority: [],
  },
  {
    key: "collapseMenu.item2",
    path: "/normal-transaction",
    component: React.lazy(() => import("views/demo/NormalTransaction")),
    authority: [],
  },
  {
    key: "collapseMenu.item3",
    path: "/internal-transaction",
    component: React.lazy(() => import("views/demo/Internal")),
    authority: [],
  },
  {
    key: "collapseMenu.item4",
    path: "/erc721",
    component: React.lazy(() => import("views/demo/Erc721")),
    authority: [],
  },

  {
    key: "OffChain.item1",
    path: "/nft-sales",
    component: React.lazy(() => import("views/demo/off-chain/NFTSale")),
    authority: [],
  },

  {
    key: "OffChain.item2",
    path: "/nft-minters",
    component: React.lazy(() => import("views/demo/off-chain/NFTMinters")),
    authority: [],
  },

  {
    key: "OffChain.item3",
    path: "/nft-royalty",
    component: React.lazy(() => import("views/demo/off-chain/NFTRoyalties")),
    authority: [],
  },

  {
    key: "OffChain.item4",
    path: "/nft-collection",
    component: React.lazy(() => import("views/demo/off-chain/NFTCollections")),
    authority: [],
  },

  {
    key: "OffChain.item5",
    path: "/nft-collection-owners",
    component: React.lazy(() => import("views/demo/off-chain/NFTCollectionOwners")),
    authority: [],
  },

  {
    key: "OffChain.item6",
    path: "/creditcard-transactions",
    component: React.lazy(() => import("views/demo/off-chain/CreditCardTransactions")),
    authority: [],
  },

  // {
  //   key: "collapseMenu.item5",
  //   path: "/collapse-menu-item-view-5",
  //   component: React.lazy(() => import("views/demo/Charts")),
  //   authority: [],
  // },
  // {
  //   key: "groupMenu.single",
  //   path: "/group-single-menu-item-view",
  //   component: React.lazy(() => import("views/demo/GroupSingleMenuItemView")),
  //   authority: [],
  // },
  // {
  //   key: "groupMenu.collapse.item1",
  //   path: "/group-collapse-menu-item-view-1",
  //   component: React.lazy(() =>
  //     import("views/demo/GroupCollapseMenuItemView1")
  //   ),
  //   authority: [],
  // },
  // {
  //   key: "groupMenu.collapse.item2",
  //   path: "/group-collapse-menu-item-view-2",
  //   component: React.lazy(() =>
  //     import("views/demo/GroupCollapseMenuItemView2")
  //   ),
  //   authority: [],
  // },
  {
    key: "docs.documentation",
    path: `${DOCS_PREFIX_PATH}/documentation/*`,
    component: React.lazy(() => import("views/docs/Documentations")),
    authority: [],
  },
  {
    key: "docs.sharedComponentDoc",
    path: `${DOCS_PREFIX_PATH}/shared-component-doc/*`,
    component: React.lazy(() => import("views/docs/SharedComponentsDoc")),
    authority: [],
  },
  {
    key: "docs.utilsDoc",
    path: `${DOCS_PREFIX_PATH}/utils-doc/*`,
    component: React.lazy(() => import("views/docs/UtilsDoc")),
    authority: [],
  },
  {
    key: "docs.changeLog",
    path: `${DOCS_PREFIX_PATH}/changelog`,
    component: React.lazy(() => import("views/docs/ChangeLog")),
    authority: [],
  },
];
