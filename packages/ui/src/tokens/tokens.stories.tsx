import type { Meta, StoryObj } from "@storybook/react";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { fontFamily, fontSize, fontWeight } from "./typography";
import { radii } from "./radii";
import { shadows } from "./shadows";
import { zIndex } from "./zIndex";
import { breakpoints } from "./breakpoints";

const meta: Meta = {
  title: "Design Tokens/Overview",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

const ColorSwatch = ({ name, value }: { name: string; value: string }) => (
  <div className="flex items-center gap-3 p-2">
    <div
      className="w-12 h-12 rounded-md border border-border"
      style={{ backgroundColor: value }}
    />
    <div>
      <div className="font-medium text-sm">{name}</div>
      <div className="text-xs text-foreground-muted">{value}</div>
    </div>
  </div>
);

const ColorGroup = ({ name, shades }: { name: string; shades: Record<string, string> }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold mb-2 capitalize">{name}</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {Object.entries(shades).map(([shade, value]) => (
        <ColorSwatch key={shade} name={`${name}-${shade}`} value={value} />
      ))}
    </div>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Color Tokens</h2>
      <ColorGroup name="primary" shades={colors.primary} />
      <ColorGroup name="background" shades={colors.background} />
      <ColorGroup name="foreground" shades={colors.foreground} />
      <ColorGroup name="border" shades={colors.border} />
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Status Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(colors.status).map(([statusName, statusValues]) => (
            Object.entries(statusValues).map(([shade, value]) => (
              <ColorSwatch key={`${statusName}-${shade}`} name={`${statusName}-${shade}`} value={value} />
            ))
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Spacing Tokens</h2>
      <div className="space-y-4">
        {Object.entries(spacing).map(([name, value]) => (
          <div key={name} className="flex items-center gap-4">
            <div className="w-16 text-sm font-medium">{name}</div>
            <div
              className="h-4 bg-primary rounded"
              style={{ width: value }}
            />
            <div className="text-sm text-foreground-muted">{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Typography Tokens</h2>

      <div>
        <h3 className="text-sm font-semibold mb-4">Font Sizes</h3>
        <div className="space-y-3">
          {Object.entries(fontSize).map(([name, value]) => {
            const size = Array.isArray(value) ? value[0] : value;
            return (
              <div key={name} className="flex items-baseline gap-4">
                <div className="w-16 text-sm font-medium">{name}</div>
                <div style={{ fontSize: size }}>{size} - The quick brown fox</div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Font Weights</h3>
        <div className="space-y-2">
          {Object.entries(fontWeight).map(([name, value]) => (
            <div key={name} className="flex items-center gap-4">
              <div className="w-20 text-sm">{name}</div>
              <div style={{ fontWeight: value }}>
                {value} - The quick brown fox
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Font Family</h3>
        <div className="space-y-2">
          <div style={{ fontFamily: Array.isArray(fontFamily.sans) ? fontFamily.sans.join(", ") : fontFamily.sans }}>
            Sans: {Array.isArray(fontFamily.sans) ? fontFamily.sans.join(", ") : fontFamily.sans}
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Radii: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Border Radius Tokens</h2>
      <div className="flex flex-wrap gap-6">
        {Object.entries(radii).map(([name, value]) => (
          <div key={name} className="text-center">
            <div
              className="w-16 h-16 bg-primary mb-2"
              style={{ borderRadius: value }}
            />
            <div className="text-sm font-medium">{name}</div>
            <div className="text-xs text-foreground-muted">{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Shadow Tokens</h2>
      <div className="flex flex-wrap gap-8">
        {Object.entries(shadows).map(([name, value]) => (
          <div key={name} className="text-center">
            <div
              className="w-24 h-24 bg-background rounded-lg mb-2"
              style={{ boxShadow: value }}
            />
            <div className="text-sm font-medium">{name}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ZIndex: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Z-Index Tokens</h2>
      <div className="space-y-2">
        {Object.entries(zIndex).map(([name, value]) => (
          <div key={name} className="flex items-center gap-4">
            <div className="w-32 text-sm font-medium">{name}</div>
            <div className="text-sm text-foreground-muted">{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Breakpoints: Story = {
  render: () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Breakpoint Tokens</h2>
      <div className="space-y-4">
        {Object.entries(breakpoints).map(([name, value]) => (
          <div key={name} className="flex items-center gap-4">
            <div className="w-16 text-sm font-medium">{name}</div>
            <div
              className="h-4 bg-primary rounded"
              style={{ width: `${value / 10}px` }}
            />
            <div className="text-sm text-foreground-muted">{value}px</div>
          </div>
        ))}
      </div>
    </div>
  ),
};
