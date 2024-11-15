"use client";

import { useState } from "react";
import { Code2, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./CodeBlock";

interface PatternExample {
  before: string;
  after: string;
  explanation: string;
}

interface Pattern {
  name: string;
  description: string;
  example: PatternExample;
}

interface PatternCardProps {
  pattern: Pattern;
}

export function PatternCard({ pattern }: PatternCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <Code2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">{pattern.name}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {pattern.description}
            </p>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">View Example</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {pattern.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="mt-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                {pattern.example.explanation}
              </p>
              
              <Tabs defaultValue="before">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="before">Before Pattern</TabsTrigger>
                  <TabsTrigger value="after">After Pattern</TabsTrigger>
                </TabsList>
                <TabsContent value="before">
                  <CodeBlock code={pattern.example.before} />
                </TabsContent>
                <TabsContent value="after">
                  <CodeBlock code={pattern.example.after} />
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}