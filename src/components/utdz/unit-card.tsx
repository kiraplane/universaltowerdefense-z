import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Unit } from '@/data/utdz/types';
import { LocaleLink } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export function UnitCard({ unit }: { unit: Unit }) {
  return (
    <article className="grid h-full gap-4 rounded-lg border border-[#322123] bg-[#151011] p-4 shadow-sm">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-[#E23A2E] text-[#120707]">
            Tier {unit.tier}
          </Badge>
          <Badge className="bg-[#F4B942] text-[#120707]">{unit.role}</Badge>
          {unit.updateTag ? (
            <Badge className="bg-[#8B5CF6] text-white">{unit.updateTag}</Badge>
          ) : null}
        </div>
        <h3 className="font-display text-xl font-bold text-white">
          {unit.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-[#5A3A36] text-[#D8CCC7]">
            {unit.rarity}
          </Badge>
          <Badge variant="outline" className="border-[#5A3A36] text-[#D8CCC7]">
            {unit.placement}
          </Badge>
          {unit.element ? (
            <Badge
              variant="outline"
              className="border-[#5A3A36] text-[#D8CCC7]"
            >
              {unit.element}
            </Badge>
          ) : null}
        </div>
      </div>

      <p className="text-sm leading-6 text-[#B8AAA5]">{unit.summary}</p>

      <div className="grid gap-2 text-sm">
        <div className="rounded-md bg-[#100B0C] p-3">
          <span className="block text-[#7F8AA3]">Best traits</span>
          <strong className="text-[#F8FAFC]">
            {unit.bestTraits.join(', ') || 'Needs testing'}
          </strong>
        </div>
        <div className="rounded-md bg-[#100B0C] p-3">
          <span className="block text-[#7F8AA3]">Best relics</span>
          <strong className="text-[#F8FAFC]">
            {unit.bestRelics.join(', ') || 'Needs testing'}
          </strong>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3">
        <Badge variant="outline" className="border-[#5A3A36] text-[#D8CCC7]">
          {unit.upgradePriority} priority
        </Badge>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-[#E23A2E] text-[#E23A2E] hover:bg-[#E23A2E] hover:text-[#120707]"
        >
          <LocaleLink href={`/units/${unit.slug}`}>
            Details
            <ArrowRight className="size-4" />
          </LocaleLink>
        </Button>
      </div>
    </article>
  );
}
