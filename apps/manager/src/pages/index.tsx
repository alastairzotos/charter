import { TabsPrevNextButtons, TabsProvider, TabsView } from "ui";

export default function Home() {
  return (
    <>
      <p>hello</p>

      <TabsProvider
        tabs={[
          {
            label: "Tab 1",
            content: <p>the first tab</p>,
          },
          {
            label: "Tab 2",
            content: <p>the second tab</p>,
          },
          {
            label: "Tab 3",
            content: <p>the third tab</p>,
          },
        ]}
      >
        <TabsView />
        <TabsPrevNextButtons />
      </TabsProvider>
    </>
  );
}
