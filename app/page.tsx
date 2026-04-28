"use client";

import styled from "styled-components";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/src/shared/ui/Button";
import { Input } from "@/src/shared/ui/Input";
import { Card } from "@/src/shared/ui/Card";
import { Skeleton } from "@/src/shared/ui/Skeleton";

const Page = styled.main`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.background};
`;

const Section = styled.section`
  max-width: 900px;
  margin: 0 auto 32px;
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const BlockTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export default function Home() {
  return (
    <Page>
      <Section>
        <Title>UI Kit Demo</Title>
      </Section>

      <Section>
        <BlockTitle>Buttons</BlockTitle>

        <Row>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button leftIcon={<Plus />}>Добавить задачу</Button>
          <Button variant="danger" leftIcon={<Trash2 />}>
            Удалить
          </Button>
          <Button variant="outlined">outlined</Button>
        </Row>
      </Section>

      <Section>
        <BlockTitle>Inputs</BlockTitle>

        <Grid>
          <Input label="Название задачи" placeholder="Например: Сделать UI-kit" />
          <Input label="Исполнитель" placeholder="Введите имя" />
          <Input
            label="Ошибка"
            placeholder="Некорректное значение"
            error="Поле обязательно для заполнения"
          />
          <Input label="Disabled" placeholder="Недоступно" disabled />
        </Grid>
      </Section>

      <Section>
        <BlockTitle>Cards</BlockTitle>

        <Grid>
          <Card
            title="Настроить проект"
            description="Базовая задача для kanban-доски"
            actions={<Button size="sm" variant="secondary">Edit</Button>}
          >
            Карточка задачи с описанием, действиями и обычным контентом.
          </Card>

          <Card title="UI Components" description="Shared layer">
            <Stack>
              <Skeleton height="18px" width="70%" />
              <Skeleton height="14px" width="90%" />
              <Skeleton height="14px" width="60%" />
            </Stack>
          </Card>
        </Grid>
      </Section>
    </Page>
  );
}