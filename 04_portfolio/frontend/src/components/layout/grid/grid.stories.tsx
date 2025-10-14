import type { Meta, StoryObj } from "@storybook/nextjs";
import { Grid, GridItem } from "./grid";

const meta = {
  title: "Design System / Layout / Grid",
  component: Grid,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

const ColorBox = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <div className={`bg-primary-200 p-4 rounded text-center ${className}`}>
    {children || "Grid Item"}
  </div>
);

export const BasicGrid: Story = {
  render: () => (
    <Grid className="gap-m">
      <GridItem span={12}>
        <ColorBox>Full Width (12 columns)</ColorBox>
      </GridItem>
      <GridItem span={6}>
        <ColorBox>Half Width (6 columns)</ColorBox>
      </GridItem>
      <GridItem span={6}>
        <ColorBox>Half Width (6 columns)</ColorBox>
      </GridItem>
      <GridItem span={4}>
        <ColorBox>4 columns</ColorBox>
      </GridItem>
      <GridItem span={4}>
        <ColorBox>4 columns</ColorBox>
      </GridItem>
      <GridItem span={4}>
        <ColorBox>4 columns</ColorBox>
      </GridItem>
      <GridItem span={3}>
        <ColorBox>3 cols</ColorBox>
      </GridItem>
      <GridItem span={3}>
        <ColorBox>3 cols</ColorBox>
      </GridItem>
      <GridItem span={3}>
        <ColorBox>3 cols</ColorBox>
      </GridItem>
      <GridItem span={3}>
        <ColorBox>3 cols</ColorBox>
      </GridItem>
    </Grid>
  ),
};

export const WithOffsets: Story = {
  render: () => (
    <Grid className="gap-m">
      <GridItem span={8} offset={2}>
        <ColorBox>8 columns with 2 column offset (centered)</ColorBox>
      </GridItem>
      <GridItem span={6} offset={3}>
        <ColorBox>6 columns with 3 column offset (centered)</ColorBox>
      </GridItem>
      <GridItem span={4} offset={4}>
        <ColorBox>4 columns with 4 column offset (centered)</ColorBox>
      </GridItem>
      <GridItem span={6} offset={0}>
        <ColorBox>6 columns, no offset</ColorBox>
      </GridItem>
      <GridItem span={4} offset={2}>
        <ColorBox>4 columns with 2 offset</ColorBox>
      </GridItem>
    </Grid>
  ),
};

export const ResponsiveBreakpoints: Story = {
  render: () => (
    <Grid className="gap-m">
      <GridItem span={{ sm: 12, md: 6, lg: 4 }}>
        <ColorBox className="bg-accent-200">
          <div className="text-sm">sm: 12 cols</div>
          <div className="text-sm">md: 6 cols</div>
          <div className="text-sm">lg: 4 cols</div>
        </ColorBox>
      </GridItem>
      <GridItem span={{ sm: 12, md: 6, lg: 4 }}>
        <ColorBox className="bg-accent-200">
          <div className="text-sm">sm: 12 cols</div>
          <div className="text-sm">md: 6 cols</div>
          <div className="text-sm">lg: 4 cols</div>
        </ColorBox>
      </GridItem>
      <GridItem span={{ sm: 12, md: 12, lg: 4 }}>
        <ColorBox className="bg-accent-200">
          <div className="text-sm">sm: 12 cols</div>
          <div className="text-sm">md: 12 cols</div>
          <div className="text-sm">lg: 4 cols</div>
        </ColorBox>
      </GridItem>
    </Grid>
  ),
};

export const ResponsiveOffsets: Story = {
  render: () => (
    <Grid className="gap-m">
      <GridItem span={{ sm: 12, md: 8, lg: 6 }} offset={{ sm: 0, md: 2, lg: 3 }}>
        <ColorBox className="bg-peach-200">
          <div className="text-sm">sm: 12 cols, 0 offset</div>
          <div className="text-sm">md: 8 cols, 2 offset</div>
          <div className="text-sm">lg: 6 cols, 3 offset</div>
        </ColorBox>
      </GridItem>
      <GridItem span={{ sm: 12, md: 6, lg: 4 }} offset={{ sm: 0, md: 3, lg: 4 }}>
        <ColorBox className="bg-peach-200">
          <div className="text-sm">sm: 12 cols, 0 offset</div>
          <div className="text-sm">md: 6 cols, 3 offset</div>
          <div className="text-sm">lg: 4 cols, 4 offset</div>
        </ColorBox>
      </GridItem>
    </Grid>
  ),
};

export const AsymmetricLayout: Story = {
  render: () => (
    <Grid className="gap-m">
      <GridItem span={8}>
        <ColorBox className="bg-success-200 h-32">Main Content (8 columns)</ColorBox>
      </GridItem>
      <GridItem span={4}>
        <ColorBox className="bg-warning-200 h-32">Sidebar (4 columns)</ColorBox>
      </GridItem>
      <GridItem span={3}>
        <ColorBox className="bg-accent-200">Card 1</ColorBox>
      </GridItem>
      <GridItem span={3}>
        <ColorBox className="bg-accent-200">Card 2</ColorBox>
      </GridItem>
      <GridItem span={3}>
        <ColorBox className="bg-accent-200">Card 3</ColorBox>
      </GridItem>
      <GridItem span={3}>
        <ColorBox className="bg-accent-200">Card 4</ColorBox>
      </GridItem>
    </Grid>
  ),
};

export const NestedGrids: Story = {
  render: () => (
    <Grid className="gap-m">
      <GridItem span={12}>
        <ColorBox className="bg-primary-300">
          <div className="mb-4">Outer Grid Item</div>
          <Grid className="gap-s">
            <GridItem span={6}>
              <ColorBox className="bg-accent-300">Nested 6</ColorBox>
            </GridItem>
            <GridItem span={6}>
              <ColorBox className="bg-accent-300">Nested 6</ColorBox>
            </GridItem>
          </Grid>
        </ColorBox>
      </GridItem>
    </Grid>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <Grid className="gap-m">
      <GridItem span={12}>
        <ColorBox className="bg-primary-300 h-20">Header - Full Width</ColorBox>
      </GridItem>
      <GridItem span={{ sm: 12, md: 3, lg: 2 }}>
        <ColorBox className="bg-accent-200 h-64">Sidebar</ColorBox>
      </GridItem>
      <GridItem span={{ sm: 12, md: 9, lg: 10 }}>
        <Grid className="gap-s">
          <GridItem span={{ sm: 12, lg: 8 }}>
            <ColorBox className="bg-peach-200 h-64">Main Content</ColorBox>
          </GridItem>
          <GridItem span={{ sm: 12, lg: 4 }}>
            <ColorBox className="bg-warning-200 h-64">Right Sidebar</ColorBox>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem span={12}>
        <ColorBox className="bg-primary-300 h-16">Footer - Full Width</ColorBox>
      </GridItem>
    </Grid>
  ),
};

export const RealWorldExample: Story = {
  render: () => (
    <Grid className="gap-l">
      <GridItem
        span={{ sm: 12, md: 8, lg: 6 }}
        offset={{ sm: 0, md: 2, lg: 3 }}
        className="flex flex-col items-center gap-s"
      >
        <div className="text-center">
          <h1 className="text-headline-1 font-bold text-accent-700">万 Yorozu</h1>
          <h2 className="text-headline-5 italic mt-2">
            Ten Thousand Artisans, One Ethical Marketplace
          </h2>
        </div>
      </GridItem>
      <GridItem span={{ sm: 12, md: 10, lg: 8 }} offset={{ sm: 0, md: 1, lg: 2 }}>
        <div className="bg-accent-100 rounded-lg h-64 flex items-center justify-center">
          <span className="text-accent-700">Hero Image</span>
        </div>
      </GridItem>
      <GridItem
        span={{ sm: 12, md: 8, lg: 6 }}
        offset={{ sm: 0, md: 2, lg: 3 }}
        className="flex flex-col gap-xs"
      >
        <h3 className="text-headline-3 font-semibold text-accent-800">
          We're Not Satisfied with the Status Quo
        </h3>
        <p className="text-body">
          The internet was supposed to connect us, empower creators, and democratize commerce.
          Instead, platforms extract value, manipulate algorithms, and prioritize growth over
          people.
        </p>
        <p className="text-body">
          We believe the internet can be better. We're building Yorozu together with the artisans as
          proof - a marketplace that puts artisans first, respects craft, and shows that ethical
          business isn't just possible, it's necessary.
        </p>
      </GridItem>
    </Grid>
  ),
};

export const AllColumnWidths: Story = {
  render: () => (
    <Grid className="gap-xs">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cols) => (
        <GridItem key={cols} span={cols}>
          <ColorBox className="text-xs">
            {cols} col{cols !== 1 ? "s" : ""}
          </ColorBox>
        </GridItem>
      ))}
    </Grid>
  ),
};

export const Playground: Story = {
  render: () => (
    <Grid className="gap-m">
      <GridItem span={12}>
        <ColorBox>Span: 12</ColorBox>
      </GridItem>
      <GridItem span={6}>
        <ColorBox>Span: 6</ColorBox>
      </GridItem>
      <GridItem span={6}>
        <ColorBox>Span: 6</ColorBox>
      </GridItem>
      <GridItem span={4} offset={4}>
        <ColorBox>Span: 4, Offset: 4</ColorBox>
      </GridItem>
    </Grid>
  ),
};
