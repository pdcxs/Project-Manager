import { AppShell, Accordion, Container, Stack, Title } from "@mantine/core";
import { IconFolderPlus, IconFileUpload } from "@tabler/icons-react";
import Header from "./components/Header";
import CreateSessionForm from "./components/CreateSessionForm"; // 引入刚刚编写的创建会话组件
import ExportSession from "./components/ExportSession";

export const App = () => {
  return (
    <AppShell
      header={{ height: 50 }}
      padding="md"
    >
      {/* 顶部固定 Header */}
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Container size="sm" p={0}>
          <Accordion
            variant="separated"
            radius="md"
            multiple
            defaultValue={["export-session"]}
          >
            <Accordion.Item value="create-session">
              <Accordion.Control icon={<IconFolderPlus size={20} />}>
                <Title order={5}>创建会话</Title>
              </Accordion.Control>
              <Accordion.Panel>
                <CreateSessionForm />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="export-session">
              <Accordion.Control icon={<IconFileUpload size={20} />}>
                <Title order={5}>导出会话</Title>
              </Accordion.Control>
              <Accordion.Panel>
                <ExportSession />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default App;